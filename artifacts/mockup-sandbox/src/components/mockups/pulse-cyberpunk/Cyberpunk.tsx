import React, { useState } from "react";
import {
  Zap,
  MessageCircle,
  Phone,
  Users,
  Rss,
  Bookmark,
  Settings,
  Video,
  Search,
  Smile,
  Paperclip,
  Mic,
  Send,
  Check,
  CheckCheck,
  MoreVertical,
} from "lucide-react";

const CHATS = [
  {
    id: 1,
    name: "Алексей Смирнов",
    lastMessage: "Отправил тебе файлы по проекту",
    time: "10:42",
    unread: 2,
    active: true,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 2,
    name: "CYBER_NINJA",
    lastMessage: "Сервера подняты, можно тестить",
    time: "09:15",
    unread: 0,
    active: false,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
  {
    id: 3,
    name: "Елена В.",
    lastMessage: "Завтра в 14:00 созвон, не забудь!",
    time: "Вчера",
    unread: 5,
    active: false,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
  {
    id: 4,
    name: "Команда Alpha",
    lastMessage: "Дизайн пушка 🚀",
    time: "Вчера",
    unread: 0,
    active: false,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
  },
  {
    id: 5,
    name: "Системные Уведомления",
    lastMessage: "Доступ разрешен. Уровень допуска: 4",
    time: "Пн",
    unread: 0,
    active: false,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h",
  },
];

const MESSAGES = [
  {
    id: 1,
    sender: "them",
    text: "Привет! Как продвигается разработка интерфейса?",
    time: "10:30",
  },
  {
    id: 2,
    sender: "me",
    text: "Привет. Почти закончил. Добавил неоновые эффекты и киберпанк вайб ⚡️",
    time: "10:32",
    status: "read",
  },
  {
    id: 3,
    sender: "them",
    text: "Звучит круто! Покажешь скрины?",
    time: "10:33",
  },
  {
    id: 4,
    sender: "me",
    text: "Конечно, сейчас собираю билд. Глоу эффекты получились просто бомба.",
    time: "10:38",
    status: "read",
  },
  {
    id: 5,
    sender: "me",
    text: "Смотри сам",
    time: "10:39",
    status: "read",
  },
  {
    id: 6,
    sender: "them",
    text: "Отправил тебе файлы по проекту",
    time: "10:42",
  },
];

export default function Cyberpunk() {
  const [activeTab, setActiveTab] = useState("chat");
  const [messageText, setMessageText] = useState("");

  return (
    <div className="flex h-screen w-full bg-[#000000] text-white font-sans overflow-hidden selection:bg-[#ec4899] selection:text-white">
      {/* 1. LEFT NAV */}
      <div className="w-16 flex flex-col items-center py-6 bg-black border-r border-white/5 relative z-10">
        <div className="mb-8 p-3 rounded-xl bg-violet-500/10 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          <Zap className="w-6 h-6 text-[#a855f7]" strokeWidth={2.5} />
        </div>

        <div className="flex flex-col gap-6 flex-1 w-full items-center mt-4">
          <NavItem icon={MessageCircle} id="chat" active={activeTab === "chat"} onClick={() => setActiveTab("chat")} />
          <NavItem icon={Users} id="users" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
          <NavItem icon={Phone} id="calls" active={activeTab === "calls"} onClick={() => setActiveTab("calls")} />
          <NavItem icon={Rss} id="feed" active={activeTab === "feed"} onClick={() => setActiveTab("feed")} />
          <NavItem icon={Bookmark} id="saved" active={activeTab === "saved"} onClick={() => setActiveTab("saved")} />
        </div>

        <div className="mt-auto">
          <NavItem icon={Settings} id="settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </div>
      </div>

      {/* 2. CHAT LIST */}
      <div className="w-[320px] flex flex-col bg-[#050507] border-r border-white/5 relative z-10">
        <div className="p-5 flex flex-col gap-4 border-b border-white/5">
          <div className="flex justify-between items-center">
            <h2 className="font-mono text-sm tracking-widest text-[#a855f7] font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">CHATS</h2>
            <div className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
          </div>
          
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#a855f7] transition-colors" />
            <input 
              type="text" 
              placeholder="Search sequence..." 
              className="w-full bg-[#111115] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm font-mono text-white/90 placeholder:text-white/30 outline-none focus:border-[#a855f7]/50 focus:bg-[#1a0b2e]/30 focus:shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {CHATS.map((chat) => (
            <div 
              key={chat.id} 
              className={`p-4 flex gap-3 cursor-pointer transition-all border-b border-white/[0.02] ${
                chat.active 
                  ? "bg-[#a855f7]/10 border-l-[3px] border-l-[#a855f7] pl-[13px]" 
                  : "hover:bg-white/5 border-l-[3px] border-l-transparent pl-[13px]"
              }`}
            >
              <div className="relative">
                <div className={`p-[2px] rounded-full bg-gradient-to-br from-[#a855f7] to-[#06b6d4] ${chat.active ? 'shadow-[0_0_15px_rgba(168,85,247,0.4)]' : ''}`}>
                  <img src={chat.avatar} alt={chat.name} className="w-11 h-11 rounded-full border-2 border-black object-cover" />
                </div>
                {chat.active && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#06b6d4] border-2 border-black rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold truncate ${chat.active ? 'text-white' : 'text-white/90'}`}>
                    {chat.name}
                  </span>
                  <span className={`text-[10px] font-mono ${chat.active ? 'text-[#a855f7]' : 'text-white/30'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs truncate mr-2 ${chat.unread > 0 ? 'text-white/80' : 'text-white/40'}`}>
                    {chat.lastMessage}
                  </span>
                  {chat.unread > 0 && (
                    <span className="bg-[#a855f7] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-black relative">
        {/* Scan-line background overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 z-0 mix-blend-overlay"></div>
        
        {/* Decorative scan-line top */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#06b6d4]/50 to-transparent absolute top-0 z-20"></div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#000000]/80 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-4">
            <div className="p-[2px] rounded-full bg-gradient-to-br from-[#a855f7] to-[#06b6d4] shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <img src={CHATS[0].avatar} alt={CHATS[0].name} className="w-10 h-10 rounded-full border-2 border-black object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight tracking-wide">{CHATS[0].name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono text-[#06b6d4] tracking-widest uppercase">онлайн</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-lg text-white/60 hover:text-[#ec4899] hover:bg-[#ec4899]/10 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-lg text-white/60 hover:text-[#ec4899] hover:bg-[#ec4899]/10 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all">
              <Video className="w-5 h-5" />
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
            <button className="p-2.5 rounded-lg text-white/60 hover:text-white transition-all">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10 custom-scrollbar">
          <div className="text-center my-4">
            <span className="font-mono text-[10px] text-white/20 bg-white/5 px-3 py-1 rounded-sm border border-white/5 uppercase tracking-widest">
              SYSTEM INITIALIZED // TODAY
            </span>
          </div>

          {MESSAGES.map((msg) => {
            const isMe = msg.sender === "me";
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
                <div className={`max-w-[70%] flex flex-col gap-1.5 ${isMe ? "items-end" : "items-start"}`}>
                  <div 
                    className={`px-5 py-3 rounded-2xl relative ${
                      isMe 
                        ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white rounded-tr-sm shadow-[0_5px_20px_rgba(236,72,153,0.3)]" 
                        : "bg-[#111115] text-white/90 rounded-tl-sm border-l-2 border-[#06b6d4] shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                    
                    {/* Tiny decorative corners for cyberpunk feel */}
                    {!isMe && <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10" />}
                    {isMe && <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />}
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="font-mono text-[10px] text-white/30">{msg.time}</span>
                    {isMe && (
                      <span className="text-[#06b6d4]">
                        {msg.status === "read" ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#050507] border-t border-white/[0.08] relative z-20">
          <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <button className="p-3 rounded-xl text-white/40 hover:text-[#06b6d4] hover:bg-[#06b6d4]/10 transition-all flex-shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative group">
              <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Transmit message..." 
                className="w-full bg-[#111115] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#a855f7]/60 focus:bg-[#1a0b2e]/40 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all resize-none min-h-[46px] max-h-[120px] custom-scrollbar"
                rows={1}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            
            {messageText.length === 0 ? (
              <button className="p-3 rounded-xl text-white/40 hover:text-[#a855f7] hover:bg-[#a855f7]/10 transition-all flex-shrink-0">
                <Mic className="w-5 h-5" />
              </button>
            ) : (
              <button className="p-3 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] hover:scale-105 transition-all flex-shrink-0">
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Decorative scan-line bottom */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#ec4899]/50 to-transparent absolute bottom-0 z-30"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}} />
    </div>
  );
}

function NavItem({ icon: Icon, id, active, onClick }: { icon: any, id: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group ${
        active 
          ? "text-white" 
          : "text-white/40 hover:text-white/80 hover:bg-white/5"
      }`}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 rounded-xl blur-sm" />
      )}
      {active && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 rounded-xl border border-white/10" />
      )}
      <Icon className={`w-6 h-6 relative z-10 transition-all ${active ? "drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" : ""}`} />
      
      {active && (
        <div className="absolute left-[-8px] w-1 h-6 bg-gradient-to-b from-[#a855f7] to-[#ec4899] rounded-r-md shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
      )}
    </button>
  );
}
