import React, { useState } from "react";
import { useSendMessage, getGetMessagesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Paperclip, Mic, Smile, SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ChatInput({ chatId }: { chatId: number }) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const sendMessage = useSendMessage();

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;

    sendMessage.mutate(
      { data: { chatId, text, type: "text" } },
      {
        onSuccess: () => {
          setText("");
          queryClient.invalidateQueries({ queryKey: getGetMessagesQueryKey({ chatId }) });
        }
      }
    );
  };

  return (
    <form onSubmit={handleSend} className="flex items-end gap-2 bg-secondary rounded-2xl p-2 border border-border focus-within:border-primary/50 transition-colors">
      <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
        <Paperclip size={20} />
      </button>
      
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type a message..."
        className="flex-1 bg-transparent border-none resize-none max-h-32 min-h-[40px] py-2 px-2 focus:outline-none text-sm placeholder:text-muted-foreground"
        rows={1}
      />
      
      <div className="flex items-center gap-1 shrink-0 pb-1">
        <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Smile size={20} />
        </button>
        {text.trim() ? (
          <button 
            type="submit" 
            className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(0,188,212,0.3)]"
          >
            <SendHorizontal size={18} />
          </button>
        ) : (
          <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Mic size={20} />
          </button>
        )}
      </div>
    </form>
  );
}
