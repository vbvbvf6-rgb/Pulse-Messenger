import React from 'react';
import {
  MessageCircle,
  Phone,
  Users,
  Rss,
  Star,
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
  PhoneCall
} from 'lucide-react';

export default function Aurora() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a1a] text-white font-sans selection:bg-violet-500/30">
      {/* Background Aurora Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/30 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-500/20 blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-rose-500/20 blur-[130px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex backdrop-blur-[100px] bg-black/10">
        
        {/* LEFT NAV */}
        <nav className="w-20 flex flex-col items-center py-6 border-r border-white/5 bg-white/[0.02] backdrop-blur-2xl z-20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-teal-400 p-[1px] mb-8 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <div className="w-full h-full rounded-full bg-[#0a0a1a] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-500 to-teal-400 blur-[2px]" />
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1 w-full items-center">
            <NavIcon icon={<MessageCircle size={24} />} active />
            <NavIcon icon={<Phone size={24} />} />
            <NavIcon icon={<Users size={24} />} />
            <NavIcon icon={<Rss size={24} />} />
            <NavIcon icon={<Star size={24} />} />
          </div>

          <div className="mt-auto">
            <NavIcon icon={<Settings size={24} />} />
          </div>
        </nav>

        {/* CHAT LIST */}
        <aside className="w-[340px] flex flex-col border-r border-white/5 bg-white/[0.03] backdrop-blur-3xl z-10">
          <div className="p-6 pb-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent mb-6 tracking-tight">
              Pulse
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text" 
                placeholder="Поиск..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all backdrop-blur-md shadow-inner"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
            <ChatItem 
              name="Алексей Смирнов" 
              message="Отлично! Договорились 👍" 
              time="18:02" 
              unread={0} 
              active 
              avatar="https://i.pravatar.cc/150?u=1" 
            />
            <ChatItem 
              name="Дизайн-команда" 
              message="Макеты отправил в Фигму" 
              time="16:45" 
              unread={3} 
              avatar="https://i.pravatar.cc/150?u=2" 
            />
            <ChatItem 
              name="Мария Иванова" 
              message="Спасибо за помощь! ✨" 
              time="Вчера" 
              unread={0} 
              avatar="https://i.pravatar.cc/150?u=3" 
            />
            <ChatItem 
              name="Dev Chat" 
              message="Сервер обновлен" 
              time="Вчера" 
              unread={12} 
              avatar="https://i.pravatar.cc/150?u=4" 
            />
            <ChatItem 
              name="Елена" 
              message="Голосовое сообщение" 
              time="Вт" 
              unread={0} 
              avatar="https://i.pravatar.cc/150?u=5" 
            />
          </div>
        </aside>

        {/* CHAT WINDOW */}
        <main className="flex-1 flex flex-col bg-transparent relative z-0">
          {/* Chat Header */}
          <header className="h-20 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl flex items-center justify-between px-8 z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-violet-500 to-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                  <img src="https://i.pravatar.cc/150?u=1" alt="avatar" className="w-full h-full rounded-full object-cover border-2 border-[#0a0a1a]" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0a0a1a] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white/90">Алексей Смирнов</h2>
                <p className="text-sm text-emerald-400/90 font-medium">онлайн</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <button className="p-2.5 rounded-full hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md">
                <PhoneCall size={20} />
              </button>
              <button className="p-2.5 rounded-full hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md">
                <Video size={20} />
              </button>
              <div className="w-px h-6 bg-white/10 mx-1"></div>
              <button className="p-2.5 rounded-full hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md">
                <MoreVertical size={20} />
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar relative z-0">
            <div className="flex justify-center my-4">
              <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 backdrop-blur-md shadow-sm">
                Сегодня
              </div>
            </div>

            <ReceivedMessage time="17:42">Привет! Как дела?</ReceivedMessage>
            
            <SentMessage time="17:45" read>Всё отлично, спасибо 😊 Рад слышать!</SentMessage>
            
            <ReceivedMessage time="17:50">Когда встречаемся по поводу нового проекта?</ReceivedMessage>
            
            <SentMessage time="17:55" read>Завтра в 18:00 подойдёт? В том же кафе.</SentMessage>
            
            <ReceivedMessage time="18:02" reaction="❤️">Отлично! Договорились 👍</ReceivedMessage>
            
            <SentMessage time="18:03" read>Жду с нетерпением ✨</SentMessage>
          </div>

          {/* Input Bar */}
          <footer className="p-6 pt-2 bg-transparent z-10">
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-3xl p-2 pl-4 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <button className="text-white/40 hover:text-teal-300 transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Написать сообщение..." 
                className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none px-2 py-2"
                defaultValue="Я тоже!"
              />
              <button className="text-white/40 hover:text-rose-300 transition-colors p-2">
                <Smile size={20} />
              </button>
              <button className="text-white/40 hover:text-white transition-colors p-2">
                <Mic size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center ml-1 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all transform hover:scale-105 active:scale-95">
                <Send size={18} className="text-white ml-0.5" />
              </button>
            </div>
          </footer>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

function NavIcon({ icon, active }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className="relative group w-full flex justify-center cursor-pointer">
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-400 to-teal-400 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
      )}
      <div className={`
        p-3 rounded-2xl transition-all duration-300
        ${active 
          ? 'bg-gradient-to-tr from-violet-500/20 to-teal-400/20 text-white shadow-[inset_0_0_20px_rgba(139,92,246,0.2)] border border-white/10' 
          : 'text-white/40 hover:text-white hover:bg-white/5'}
      `}>
        {icon}
      </div>
    </div>
  );
}

function ChatItem({ name, message, time, unread, active, avatar }: { name: string, message: string, time: string, unread: number, active?: boolean, avatar: string }) {
  return (
    <div className={`
      flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300
      ${active 
        ? 'bg-white/10 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-xl' 
        : 'hover:bg-white/5 border border-transparent'}
    `}>
      <div className="relative shrink-0">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
        {active && <div className="absolute inset-0 rounded-full border-2 border-violet-400/50 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className={`font-medium truncate ${active ? 'text-white' : 'text-white/90'}`}>{name}</h3>
          <span className={`text-xs ${active ? 'text-violet-300' : 'text-white/40'}`}>{time}</span>
        </div>
        <p className={`text-sm truncate ${active ? 'text-white/80' : 'text-white/50'}`}>{message}</p>
      </div>
      {unread > 0 && (
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-fuchsia-500 to-rose-500 flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(244,63,94,0.5)]">
          {unread}
        </div>
      )}
    </div>
  );
}

function SentMessage({ children, time, read }: { children: React.ReactNode, time: string, read?: boolean }) {
  return (
    <div className="flex justify-end mb-2">
      <div className="max-w-[70%] flex flex-col items-end">
        <div className="px-5 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_4px_15px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border border-indigo-400/20 backdrop-blur-md">
          {children}
        </div>
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-[11px] text-white/40">{time}</span>
          {read ? <CheckCheck size={14} className="text-teal-400" /> : <Check size={14} className="text-white/40" />}
        </div>
      </div>
    </div>
  );
}

function ReceivedMessage({ children, time, reaction }: { children: React.ReactNode, time: string, reaction?: string }) {
  return (
    <div className="flex justify-start mb-2">
      <div className="max-w-[70%] flex flex-col items-start relative">
        <div className="px-5 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 text-white/90 shadow-[0_4px_15px_rgba(0,0,0,0.1)] backdrop-blur-xl">
          {children}
        </div>
        {reaction && (
          <div className="absolute -bottom-3 -right-2 bg-[#1a1a2e] border border-white/10 rounded-full px-2 py-0.5 text-xs shadow-lg flex items-center">
            {reaction}
          </div>
        )}
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-[11px] text-white/40">{time}</span>
        </div>
      </div>
    </div>
  );
}
