import React, { useState } from "react";
import { Message } from "@workspace/api-client-react";
import { format } from "date-fns";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MessageBubble({ message }: { message: Message }) {
  const { currentUserId } = useAppContext();
  const isMine = message.senderId === currentUserId;
  const [showGiftInfo, setShowGiftInfo] = useState(false);

  const formatTime = (dateStr: string) => {
    return format(new Date(dateStr), "HH:mm");
  };

  if (message.type === "gift") {
    const emoji = message.giftData?.giftItem?.emoji || "🎁";
    const giftName = message.giftData?.giftItem?.name || "Подарок";
    const rarity = (message.giftData?.giftItem as any)?.rarity;
    const description = (message.giftData?.giftItem as any)?.description;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex justify-center w-full my-3"
      >
        <div className="flex flex-col items-center gap-2 max-w-[220px] relative">
          <div
            onClick={() => setShowGiftInfo(true)}
            className="bg-card/90 backdrop-blur border border-border/60 rounded-3xl px-6 py-5 flex flex-col items-center gap-2 shadow-lg cursor-pointer hover:border-primary/40 transition-colors"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl"
            >
              {emoji}
            </motion.span>
            <p className="text-sm font-bold text-center">
              {isMine ? "Вы отправили" : `${message.sender?.displayName ?? "Кто-то"} отправил(а)`} {giftName}
            </p>
            {message.text && (
              <p className="text-xs text-muted-foreground italic text-center">«{message.text}»</p>
            )}
            <div className="flex items-center gap-1 text-xs text-primary/70">
              <Info size={11} /> Нажмите для подробностей
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">{formatTime(message.createdAt)}</span>

          <AnimatePresence>
            {showGiftInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 8 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setShowGiftInfo(false)}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div
                  onClick={e => e.stopPropagation()}
                  className="relative z-10 bg-card border border-border rounded-3xl p-6 w-full max-w-xs shadow-2xl text-center"
                >
                  <button
                    onClick={() => setShowGiftInfo(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <div className="text-6xl mb-3">{emoji}</div>
                  <h3 className="text-lg font-bold mb-1">{giftName}</h3>
                  {rarity && (
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block ${
                      rarity === "legendary" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                      rarity === "epic" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" :
                      rarity === "rare" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                      "bg-muted text-muted-foreground border border-border"
                    }`}>
                      {rarity === "legendary" ? "Легендарный" : rarity === "epic" ? "Эпический" : rarity === "rare" ? "Редкий" : "Обычный"}
                    </span>
                  )}
                  {description && <p className="text-sm text-muted-foreground mt-2 mb-3">{description}</p>}
                  <div className="space-y-1.5 text-sm mt-3 bg-secondary rounded-2xl p-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">От:</span>
                      <span className="font-medium">{message.sender?.displayName ?? "Неизвестно"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Время:</span>
                      <span className="font-medium">{formatTime(message.createdAt)}</span>
                    </div>
                    {message.text && (
                      <div className="pt-1 border-t border-border">
                        <span className="text-muted-foreground text-xs">Сообщение:</span>
                        <p className="font-medium mt-0.5 italic">«{message.text}»</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  const renderContent = () => {
    switch (message.type) {
      case "text":
        return <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>;
      case "image":
        return (
          <div className="rounded-xl overflow-hidden">
            <img
              src={message.mediaUrl || ""}
              alt="photo"
              className="max-w-xs max-h-64 object-cover block"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {message.text && <p className="text-sm mt-2 px-1">{message.text}</p>}
          </div>
        );
      case "call":
        return <p className="text-sm font-medium italic opacity-80">📞 Call ended</p>;
      default:
        return <p className="text-sm">[{message.type}] {message.text}</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex w-full group", isMine ? "justify-end" : "justify-start")}
    >
      <div className={cn(
        "flex max-w-[75%] md:max-w-[65%]",
        isMine ? "flex-row-reverse" : "flex-row",
        "items-end gap-2"
      )}>
        {!isMine && (
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white mb-1 overflow-hidden"
            style={{ backgroundColor: message.sender?.avatarColor || "#555" }}
          >
            {message.sender?.avatarUrl ? (
              <img src={message.sender.avatarUrl} alt="" className="w-full h-full object-cover" />
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
