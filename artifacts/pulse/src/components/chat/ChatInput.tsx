import React, { useState, useRef, useEffect } from "react";
import { useSendMessage, getGetMessagesQueryKey, getGetChatsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Paperclip, Mic, Smile, SendHorizontal, X, Image, Square, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJI_CATEGORIES: { label: string; emojis: string[] }[] = [
  {
    label: "😀 Smileys",
    emojis: ["😀","😂","🤣","😊","😍","🥰","😘","😎","🤩","🥳","😭","😤","😡","🤔","😏","😴","🤤","😷","😱","😨","🤯","😮","🥺","😢","😔","😕","😫","🤗","🤭","🫢","🤫","🤥","😶","😐","😑"],
  },
  {
    label: "👍 Gestures",
    emojis: ["👍","👎","👋","🤚","✋","🖐","🖖","👌","🤌","✌","🤞","🤟","🤘","🤙","👈","👉","👆","👇","☝","👏","🙌","🤲","🤝","🙏","💪","🦾"],
  },
  {
    label: "❤️ Hearts",
    emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❤️‍🔥","💕","💞","💓","💗","💖","💘","💝","💫","⭐","🌟","✨","🔥","💎"],
  },
  {
    label: "🐶 Nature",
    emojis: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐸","🐵","🐔","🐧","🐦","🦆","🦅","🦉","🦇","🐺","🦄","🦋","🌸","🌹","🌺","🌻","🌴","🌵"],
  },
  {
    label: "🍎 Food",
    emojis: ["🍎","🍊","🍋","🍇","🍓","🍒","🍑","🥭","🍍","🥥","🍕","🍔","🌮","🌯","🍜","🍣","🍦","🎂","🍰","🧁","🍫","🍬","🍭","☕","🍵","🥤","🍺","🍷","🥂"],
  },
  {
    label: "⚽ Activities",
    emojis: ["⚽","🏀","🏈","⚾","🎾","🏐","🏉","🎱","🏓","🏸","🎯","⛳","🎳","🏋️","🤸","⛷️","🏂","🏄","🎮","🕹️","🎲","🎪","🎭","🎨"],
  },
];

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ChatInput({ chatId }: { chatId: number }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiCategory, setEmojiCategory] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const queryClient = useQueryClient();
  const sendMessage = useSendMessage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      mediaRecorderRef.current?.stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg";

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordSeconds(0);
      timerRef.current = setInterval(() => setRecordSeconds(s => s + 1), 1000);
    } catch {
      alert("Нет доступа к микрофону. Разрешите доступ в настройках браузера.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
    }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsRecording(false);
  };

  const cancelRecording = () => {
    mediaRecorderRef.current?.stream?.getTracks().forEach(t => t.stop());
    if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsRecording(false);
    setAudioBlob(null);
    setRecordSeconds(0);
    chunksRef.current = [];
  };

  const sendVoice = async () => {
    if (!audioBlob) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      sendMessage.mutate(
        { data: { chatId, type: "audio", mediaUrl: base64, text: `voice:${recordSeconds}` } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetMessagesQueryKey({ chatId }) });
            queryClient.invalidateQueries({ queryKey: getGetChatsQueryKey() });
          }
        }
      );
    };
    reader.readAsDataURL(audioBlob);
    setAudioBlob(null);
    setRecordSeconds(0);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (imagePreview) {
      sendMessage.mutate(
        { data: { chatId, text: text.trim() || undefined, type: "image", mediaUrl: imagePreview } },
        {
          onSuccess: () => {
            setText("");
            setImagePreview(null);
            queryClient.invalidateQueries({ queryKey: getGetMessagesQueryKey({ chatId }) });
            queryClient.invalidateQueries({ queryKey: getGetChatsQueryKey() });
          }
        }
      );
    } else {
      sendMessage.mutate(
        { data: { chatId, text, type: "text" } },
        {
          onSuccess: () => {
            setText("");
            if (textareaRef.current) textareaRef.current.style.height = "40px";
            queryClient.invalidateQueries({ queryKey: getGetMessagesQueryKey({ chatId }) });
            queryClient.invalidateQueries({ queryKey: getGetChatsQueryKey() });
          }
        }
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const insertEmoji = (emoji: string) => {
    setText(prev => prev + emoji);
    textareaRef.current?.focus();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = "40px";
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
  };

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-full mb-2 left-0 right-0 z-50 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-border bg-background/80 px-1 overflow-x-auto scrollbar-none">
            {EMOJI_CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => setEmojiCategory(i)}
                className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${emojiCategory === i ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="p-3 grid grid-cols-8 gap-1 max-h-48 overflow-y-auto scrollbar-thin">
            {EMOJI_CATEGORIES[emojiCategory].emojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => insertEmoji(emoji)}
                className="text-xl hover:bg-secondary rounded-lg p-1 transition-colors text-center"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-2 relative inline-block">
          <div className="relative rounded-xl overflow-hidden border border-border shadow-md inline-block">
            <img src={imagePreview} alt="preview" className="max-h-40 max-w-xs object-contain" />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Voice ready to send preview */}
      <AnimatePresence>
        {audioBlob && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-2 flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-2xl px-4 py-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Mic size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Голосовое сообщение</p>
              <p className="text-xs text-muted-foreground">{formatDuration(recordSeconds)}</p>
            </div>
            <button onClick={cancelRecording} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 size={16} />
            </button>
            <button
              onClick={sendVoice}
              disabled={sendMessage.isPending}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(0,188,212,0.3)]"
            >
              <SendHorizontal size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording UI */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 mb-2"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <span className="text-sm font-medium text-red-400">Запись...</span>
            <span className="text-sm font-mono text-red-300 flex-1">{formatDuration(recordSeconds)}</span>
            <button
              onClick={cancelRecording}
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Отменить"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={stopRecording}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.4)]"
              title="Остановить и отправить"
            >
              <Square size={16} fill="white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main input bar (hidden during recording) */}
      {!isRecording && !audioBlob && (
        <form onSubmit={handleSend} className="flex items-center gap-2 bg-secondary rounded-2xl px-3 py-2 border border-border focus-within:border-primary/50 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors shrink-0"
            title="Прикрепить фото"
          >
            {imagePreview ? <Image size={20} className="text-primary" /> : <Paperclip size={20} />}
          </button>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextareaChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={imagePreview ? "Добавить подпись..." : "Сообщение..."}
            className="flex-1 bg-transparent border-none resize-none max-h-32 min-h-[40px] py-2 px-1 focus:outline-none text-sm placeholder:text-muted-foreground leading-normal align-middle"
            rows={1}
            style={{ height: "40px" }}
          />

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className={`p-1.5 transition-colors rounded-full ${showEmoji ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Smile size={20} />
            </button>
            {text.trim() || imagePreview ? (
              <button
                type="submit"
                disabled={sendMessage.isPending}
                className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(0,188,212,0.3)] disabled:opacity-50"
              >
                <SendHorizontal size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                title="Голосовое сообщение"
              >
                <Mic size={20} />
              </button>
            )}
          </div>
        </form>
      )}

      {showEmoji && (
        <div className="fixed inset-0 z-40" onClick={() => setShowEmoji(false)} />
      )}
    </div>
  );
}
