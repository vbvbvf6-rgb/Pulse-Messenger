import React from "react";
import {
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
  ArrowUp,
  Check,
  CheckCheck,
  MoreVertical,
} from "lucide-react";

export default function Obsidian() {
  return (
    <div className="flex h-screen w-full bg-[#0c0c0e] text-zinc-100 font-sans overflow-hidden selection:bg-[#3b82f6]/30">
      {/* 1. LEFT NAV */}
      <nav className="w-16 bg-[#0c0c0e] border-r border-white/5 flex flex-col items-center py-6 shrink-0 relative z-20">
        <div className="w-10 h-10 rounded-full bg-[#1d4ed8] flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(29,78,216,0.3)]">
          <span className="font-bold text-white text-lg tracking-tighter">P</span>
        </div>

        <div className="flex flex-col gap-6 flex-1 w-full items-center">
          <button className="relative w-full flex justify-center items-center group text-[#3b82f6]">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-[#3b82f6] rounded-r-full" />
            <div className="p-2.5 rounded-xl bg-[#17171c] group-hover:bg-[#1c1c23] transition-colors">
              <MessageCircle size={22} className="stroke-[2px]" />
            </div>
          </button>
          
          <button className="p-2.5 rounded-xl text-zinc-600 hover:text-zinc-300 hover:bg-[#17171c] transition-colors">
            <Users size={22} className="stroke-[2px]" />
          </button>
          
          <button className="p-2.5 rounded-xl text-zinc-600 hover:text-zinc-300 hover:bg-[#17171c] transition-colors">
            <Phone size={22} className="stroke-[2px]" />
          </button>
          
          <button className="p-2.5 rounded-xl text-zinc-600 hover:text-zinc-300 hover:bg-[#17171c] transition-colors">
            <Rss size={22} className="stroke-[2px]" />
          </button>
          
          <button className="p-2.5 rounded-xl text-zinc-600 hover:text-zinc-300 hover:bg-[#17171c] transition-colors">
            <Bookmark size={22} className="stroke-[2px]" />
          </button>
        </div>

        <button className="p-2.5 rounded-xl text-zinc-600 hover:text-zinc-300 hover:bg-[#17171c] transition-colors mt-auto">
          <Settings size={22} className="stroke-[2px]" />
        </button>
      </nav>

      {/* 2. CHAT LIST */}
      <aside className="w-[320px] bg-[#111114] border-r border-white/5 flex flex-col shrink-0 relative z-10">
        <div className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-6">Сообщения</h1>
          
          <div className="relative group">
            <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#3b82f6] transition-colors" />
            <input 
              type="text" 
              placeholder="Поиск..." 
              className="w-full bg-transparent border-b border-white/10 py-2 pl-7 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2 scrollbar-hide">
          {/* Active Chat */}
          <div className="px-3 mb-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-[16px] bg-[#17171c] border border-white/5 text-left transition-colors">
              <div className="relative shrink-0">
                <img src="https://i.pravatar.cc/150?u=alina" alt="Avatar" className="w-12 h-12 rounded-full border-[2px] border-[#3b82f6] object-cover" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0c0c0e] rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#3b82f6] rounded-full" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-zinc-100 truncate text-[15px]">Алина В.</span>
                  <span className="text-xs text-[#3b82f6] font-medium tracking-tight">10:42</span>
                </div>
                <p className="text-[13px] text-zinc-400 truncate">Сделал. Чистый черный...</p>
              </div>
            </button>
          </div>

          {/* Inactive Chats */}
          {[
            { name: "Михаил Дизайн", msg: "Правки по главной принял, спасибо", time: "Вчера", avatar: "1" },
            { name: "Crypto Team", msg: "Встреча переносится на 15:00", time: "Вчера", avatar: "2", unread: true },
            { name: "Александр (Бэкенд)", msg: "API готово, можно подключать", time: "Пн", avatar: "3" },
            { name: "Елена Маркетинг", msg: "Отличные конверсии за неделю!", time: "Пн", avatar: "4" }
          ].map((chat, i) => (
            <div key={i} className="px-3 mb-1">
              <button className="w-full flex items-center gap-3 p-3 rounded-[16px] hover:bg-[#17171c]/50 text-left transition-colors border border-transparent">
                <div className="relative shrink-0">
                  <img src={`https://i.pravatar.cc/150?u=${chat.avatar}`} alt="Avatar" className="w-12 h-12 rounded-full border border-white/10 object-cover" />
                  {chat.unread && (
                    <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#111114] rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-[#3b82f6] rounded-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-medium text-zinc-300 truncate text-[15px]">{chat.name}</span>
                    <span className="text-xs text-zinc-600 tracking-tight">{chat.time}</span>
                  </div>
                  <p className={`text-[13px] truncate ${chat.unread ? 'text-zinc-300 font-medium' : 'text-zinc-600'}`}>
                    {chat.msg}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* 3. CHAT WINDOW */}
      <main className="flex-1 flex flex-col bg-[#0c0c0e] min-w-0 relative">
        {/* Header */}
        <header className="h-[88px] shrink-0 border-b border-white/5 flex items-center justify-between px-8 bg-[#0c0c0e]/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <img src="https://i.pravatar.cc/150?u=alina" alt="Avatar" className="w-11 h-11 rounded-full border-[2px] border-[#3b82f6] object-cover" />
            <div>
              <h2 className="font-semibold text-lg text-white tracking-tight">Алина Воронина</h2>
              <p className="text-[13px] text-[#3b82f6] font-medium tracking-tight">был(а) в сети недавно</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:bg-[#17171c] hover:text-white transition-colors border border-transparent hover:border-white/5">
              <Phone size={18} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:bg-[#17171c] hover:text-white transition-colors border border-transparent hover:border-white/5">
              <Video size={18} />
            </button>
            <div className="w-[1px] h-6 bg-white/5 mx-1" />
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:bg-[#17171c] hover:text-white transition-colors border border-transparent hover:border-white/5">
              <MoreVertical size={18} />
            </button>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6">
          <div className="text-center mb-4">
            <span className="text-xs font-medium tracking-widest text-zinc-700 uppercase px-3 py-1 bg-[#111114] rounded-full border border-white/5">
              Сегодня
            </span>
          </div>

          {/* Msg 1: Received */}
          <div className="flex items-end gap-3 max-w-[70%]">
            <img src="https://i.pravatar.cc/150?u=alina" alt="Avatar" className="w-8 h-8 rounded-full border border-white/10 shrink-0 mb-1" />
            <div className="flex flex-col items-start gap-1">
              <div className="px-5 py-3.5 bg-[#1c1c23] border border-white/[0.04] text-zinc-200 text-[15px] leading-relaxed rounded-[20px] rounded-bl-sm shadow-sm">
                Привет! Как продвигается дизайн?
              </div>
              <span className="text-[11px] text-zinc-600 font-medium tracking-tight ml-2">10:30</span>
            </div>
          </div>

          {/* Msg 2: Sent */}
          <div className="flex items-end gap-3 max-w-[70%] self-end flex-row-reverse">
            <div className="flex flex-col items-end gap-1">
              <div className="px-5 py-3.5 bg-[#1d4ed8] border-l-[3px] border-[#60a5fa]/60 text-white text-[15px] leading-relaxed rounded-[20px] rounded-br-sm shadow-[0_4px_20px_-5px_rgba(29,78,216,0.4)]">
                Привет. Почти закончил концепт Obsidian. Получается очень премиально.
              </div>
              <div className="flex items-center gap-1.5 mr-2">
                <span className="text-[11px] text-[#3b82f6] font-medium tracking-tight">10:32</span>
                <CheckCheck size={14} className="text-[#3b82f6]" />
              </div>
            </div>
          </div>

          {/* Msg 3: Received */}
          <div className="flex items-end gap-3 max-w-[70%]">
            <img src="https://i.pravatar.cc/150?u=alina" alt="Avatar" className="w-8 h-8 rounded-full border border-white/10 shrink-0 mb-1" />
            <div className="flex flex-col items-start gap-1">
              <div className="px-5 py-3.5 bg-[#1c1c23] border border-white/[0.04] text-zinc-200 text-[15px] leading-relaxed rounded-[20px] rounded-bl-sm shadow-sm">
                Покажешь скрины?
              </div>
              <span className="text-[11px] text-zinc-600 font-medium tracking-tight ml-2">10:33</span>
            </div>
          </div>

          {/* Msg 4: Sent */}
          <div className="flex items-end gap-3 max-w-[70%] self-end flex-row-reverse">
            <div className="flex flex-col items-end gap-1">
              <div className="px-5 py-3.5 bg-[#1d4ed8] border-l-[3px] border-[#60a5fa]/60 text-white text-[15px] leading-relaxed rounded-[20px] rounded-br-sm shadow-[0_4px_20px_-5px_rgba(29,78,216,0.4)]">
                Да, через минуту скину. Добавляю последние штрихи с тенями.
              </div>
              <div className="flex items-center gap-1.5 mr-2">
                <span className="text-[11px] text-[#3b82f6] font-medium tracking-tight">10:35</span>
                <CheckCheck size={14} className="text-[#3b82f6]" />
              </div>
            </div>
          </div>

          {/* Msg 5: Received */}
          <div className="flex items-end gap-3 max-w-[70%]">
            <img src="https://i.pravatar.cc/150?u=alina" alt="Avatar" className="w-8 h-8 rounded-full border border-white/10 shrink-0 mb-1" />
            <div className="flex flex-col items-start gap-1">
              <div className="px-5 py-3.5 bg-[#1c1c23] border border-white/[0.04] text-zinc-200 text-[15px] leading-relaxed rounded-[20px] rounded-bl-sm shadow-sm">
                Супер, жду! Клиент просил, чтобы выглядело 'дорого'.
              </div>
              <span className="text-[11px] text-zinc-600 font-medium tracking-tight ml-2">10:38</span>
            </div>
          </div>

          {/* Msg 6: Sent */}
          <div className="flex items-end gap-3 max-w-[70%] self-end flex-row-reverse mb-4">
            <div className="flex flex-col items-end gap-1">
              <div className="px-5 py-3.5 bg-[#1d4ed8] border-l-[3px] border-[#60a5fa]/60 text-white text-[15px] leading-relaxed rounded-[20px] rounded-br-sm shadow-[0_4px_20px_-5px_rgba(29,78,216,0.4)]">
                Сделал. Чистый черный, сапфировый синий и платиновые акценты.
              </div>
              <div className="flex items-center gap-1.5 mr-2">
                <span className="text-[11px] text-[#3b82f6] font-medium tracking-tight">10:42</span>
                <Check size={14} className="text-zinc-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-[#111114] border-t border-white/5 shrink-0">
          <div className="flex items-end gap-3 max-w-5xl mx-auto">
            <div className="flex gap-1 shrink-0 mb-1.5">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors">
                <Paperclip size={20} />
              </button>
            </div>
            
            <div className="flex-1 bg-[#17171c] border border-white/5 rounded-[24px] flex items-end relative shadow-inner">
              <button className="w-12 h-[52px] flex items-center justify-center text-zinc-500 hover:text-[#3b82f6] transition-colors shrink-0">
                <Smile size={20} />
              </button>
              
              <textarea 
                rows={1}
                placeholder="Написать сообщение..." 
                className="flex-1 bg-transparent py-4 text-[15px] text-zinc-100 placeholder:text-zinc-600 focus:outline-none resize-none max-h-32 min-h-[52px]"
                defaultValue=""
              />
              
              <button className="w-12 h-[52px] flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
                <Mic size={20} />
              </button>
            </div>

            <button className="w-[52px] h-[52px] bg-[#1d4ed8] hover:bg-[#3b82f6] text-white rounded-full flex items-center justify-center shrink-0 transition-all shadow-[0_4px_20px_-5px_rgba(29,78,216,0.5)] hover:shadow-[0_4px_25px_-5px_rgba(59,130,246,0.6)]">
              <ArrowUp size={22} className="stroke-[2.5px]" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
