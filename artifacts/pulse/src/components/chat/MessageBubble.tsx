import React from "react";
import { Message } from "@workspace/api-client-react";
import { format } from "date-fns";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

export function MessageBubble({ message }: { message: Message }) {
  const { currentUserId } = useAppContext();
  const isMine = message.senderId === currentUserId;

  const formatTime = (dateStr: string) => {
    return format(new Date(dateStr), "HH:mm");
  };

  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>;
      case 'gift':
        return (
          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg backdrop-blur-sm">
            <span className="text-3xl">{message.giftData?.giftItem?.emoji || '🎁'}</span>
            <div>
              <p className="text-sm font-bold text-white">Sent a {message.giftData?.giftItem?.name || 'Gift'}</p>
              {message.text && <p className="text-xs opacity-90 italic">"{message.text}"</p>}
            </div>
          </div>
        );
      case 'call':
        return <p className="text-sm font-medium italic opacity-80">📞 Call ended</p>;
      default:
        return <p className="text-sm">[{message.type}] {message.text}</p>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full group",
        isMine ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex max-w-[75%] md:max-w-[65%]",
        isMine ? "flex-row-reverse" : "flex-row",
        "items-end gap-2"
      )}>
        {!isMine && (
          <div 
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white mb-1"
            style={{ backgroundColor: message.sender?.avatarColor || '#555' }}
          >
            {message.sender?.avatarUrl ? (
              <img src={message.sender.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              (message.sender?.displayName || "U")[0].toUpperCase()
            )}
          </div>
        )}
        
        <div className={cn(
          "relative px-4 py-2.5 rounded-2xl shadow-sm",
          isMine 
            ? "bg-primary text-primary-foreground rounded-br-sm bg-gradient-to-br from-primary to-blue-600 shadow-[0_4px_15px_rgba(0,188,212,0.2)]" 
            : "bg-secondary text-foreground rounded-bl-sm border border-border"
        )}>
          {!isMine && message.sender && (
            <p className="text-[11px] font-semibold mb-1" style={{ color: message.sender.avatarColor }}>
              {message.sender.displayName}
            </p>
          )}
          
          {renderContent()}
          
          <div className={cn(
            "flex items-center justify-end gap-1 mt-1 text-[10px] opacity-70",
            isMine ? "text-primary-foreground" : "text-muted-foreground"
          )}>
            <span>{formatTime(message.createdAt)}</span>
            {isMine && (
              message.isRead ? <CheckCheck size={14} /> : <Check size={14} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
