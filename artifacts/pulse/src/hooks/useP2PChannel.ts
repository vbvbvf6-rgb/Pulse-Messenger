import { useEffect, useRef, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetMessagesQueryKey, Message } from "@workspace/api-client-react";

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun.relay.metered.ca:80" },
  {
    urls: "turn:global.relay.metered.ca:80",
    username: "openrelayproject",
    credential: "openrelayproject",
  },
  {
    urls: "turn:global.relay.metered.ca:443",
    username: "openrelayproject",
    credential: "openrelayproject",
  },
  {
    urls: "turns:global.relay.metered.ca:443",
    username: "openrelayproject",
    credential: "openrelayproject",
  },
];

export interface P2PChannel {
  isConnected: boolean;
  send: (message: Message) => boolean;
}

export function useP2PChannel(
  chatId: number | null,
  otherUserId: number | null,
  currentUserId: number,
  enabled: boolean,
): P2PChannel {
  const queryClient = useQueryClient();
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<RTCDataChannel | null>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const chatIdRef = useRef(chatId);
  chatIdRef.current = chatId;

  // Lower user ID is the "impolite" peer (initiates connection)
  const isInitiator = currentUserId < (otherUserId ?? Infinity);

  const getHeaders = useCallback((): Record<string, string> => {
    const token = sessionStorage.getItem("pulse-token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, []);

  const sendSignal = useCallback(
    (type: string, payload: unknown) => {
      const cid = chatIdRef.current;
      if (!cid) return;
      fetch(`/api/chats/${cid}/p2p-signal`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ type, payload }),
      }).catch(() => {});
    },
    [getHeaders],
  );

  const setupChannel = useCallback(
    (channel: RTCDataChannel) => {
      channelRef.current = channel;
      channel.binaryType = "arraybuffer";

      channel.onopen = () => {
        setIsConnected(true);
      };

      channel.onclose = () => {
        setIsConnected(false);
      };

      channel.onerror = () => {
        setIsConnected(false);
      };

      channel.onmessage = (e) => {
        try {
          const msg: Message = JSON.parse(e.data as string);
          const cid = chatIdRef.current;
          if (!cid || !msg?.id) return;
          queryClient.setQueryData<Message[]>(
            getGetMessagesQueryKey({ chatId: cid }),
            (old) => {
              if (!old) return [msg];
              if (old.some((m) => m.id === msg.id)) return old;
              return [...old, msg];
            },
          );
        } catch {}
      };
    },
    [queryClient],
  );

  const createPeer = useCallback((): RTCPeerConnection => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendSignal("ice", e.candidate.toJSON());
      }
    };

    pc.ondatachannel = (e) => {
      setupChannel(e.channel);
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      if (state === "connected") {
        setIsConnected(channelRef.current?.readyState === "open");
      } else if (state === "disconnected" || state === "failed" || state === "closed") {
        setIsConnected(false);
        if (pcRef.current === pc) {
          pcRef.current = null;
        }
      }
    };

    return pc;
  }, [sendSignal, setupChannel]);

  const initiate = useCallback(async () => {
    if (pcRef.current) return;
    try {
      const pc = createPeer();
      pcRef.current = pc;

      const channel = pc.createDataChannel("messages", { ordered: true });
      setupChannel(channel);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      sendSignal("offer", { type: offer.type, sdp: offer.sdp });
    } catch {}
  }, [createPeer, setupChannel, sendSignal]);

  const handleIncomingSignal = useCallback(
    async (signal: { type: string; payload: unknown }) => {
      try {
        if (signal.type === "offer") {
          let pc = pcRef.current;
          if (pc) {
            pc.close();
            pcRef.current = null;
          }
          pc = createPeer();
          pcRef.current = pc;
          pendingCandidatesRef.current = [];

          const desc = signal.payload as RTCSessionDescriptionInit;
          await pc.setRemoteDescription(new RTCSessionDescription(desc));

          // Flush any ICE candidates that arrived before the offer
          for (const c of pendingCandidatesRef.current.splice(0)) {
            try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch {}
          }

          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          sendSignal("answer", { type: answer.type, sdp: answer.sdp });
        } else if (signal.type === "answer") {
          const pc = pcRef.current;
          if (pc && pc.signalingState === "have-local-offer") {
            await pc.setRemoteDescription(
              new RTCSessionDescription(signal.payload as RTCSessionDescriptionInit),
            );
            // Flush pending ICE candidates
            for (const c of pendingCandidatesRef.current.splice(0)) {
              try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch {}
            }
          }
        } else if (signal.type === "ice") {
          const pc = pcRef.current;
          const cand = signal.payload as RTCIceCandidateInit;
          if (pc && pc.remoteDescription) {
            try { await pc.addIceCandidate(new RTCIceCandidate(cand)); } catch {}
          } else {
            pendingCandidatesRef.current.push(cand);
          }
        }
      } catch {}
    },
    [createPeer, sendSignal],
  );

  // Listen for P2P signals dispatched from AppContext SSE handler
  useEffect(() => {
    if (!enabled || !chatId) return;

    const handler = (e: Event) => {
      const { chatId: sigChatId, type, payload } = (e as CustomEvent).detail;
      if (sigChatId === chatId) {
        handleIncomingSignal({ type, payload });
      }
    };

    window.addEventListener("pulse:p2p-signal", handler);
    return () => window.removeEventListener("pulse:p2p-signal", handler);
  }, [enabled, chatId, handleIncomingSignal]);

  // Initiator establishes connection when chat opens
  useEffect(() => {
    if (!enabled || !chatId || !otherUserId) return;
    if (!isInitiator) return;

    // Give a brief moment for the other side to subscribe to SSE
    const timer = setTimeout(() => initiate(), 800);
    return () => clearTimeout(timer);
  }, [enabled, chatId, otherUserId, isInitiator, initiate]);

  // Cleanup when chatId changes or component unmounts
  useEffect(() => {
    return () => {
      channelRef.current?.close();
      channelRef.current = null;
      pcRef.current?.close();
      pcRef.current = null;
      setIsConnected(false);
      pendingCandidatesRef.current = [];
    };
  }, [chatId]);

  const send = useCallback((message: Message): boolean => {
    const ch = channelRef.current;
    if (ch?.readyState === "open") {
      try {
        ch.send(JSON.stringify(message));
        return true;
      } catch {}
    }
    return false;
  }, []);

  return { isConnected, send };
}
