import React from "react";
import { useGetChats, Chat } from "@workspace/api-client-react";
import { formatDistanceToNow } from "date-fns";
import { Search, Pin, VolumeX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/contexts/AppContext";
import { StoriesBar } from "@/components/stories/StoriesBar";

export function ChatList() {
  const { selectedChatId, setSelectedChatId } = useAppContext();
  const { data: chats, isLoading } = useGetChats();

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search chats..." 
            className="pl-9 bg-background border-none focus-visible:ring-primary"
          />
        </div>
      </div>
      
      <div className="border-b border-border">
        <StoriesBar />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : chats?.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No chats yet
          </div>
        ) : (
          chats?.map((chat: Chat) => {
            const isSelected = selectedChatId === chat.id;
            const lastMessage = chat.lastMessage;
            const displayName = chat.type === 'direct'
              ? (chat.otherUser?.displayName || chat.name || 'Unknown')
              : (chat.name || 'Group');
            const avatarColor = chat.type === 'direct'
              ? (chat.otherUser?.avatarColor || chat.avatarColor || '#333')
              : (chat.avatarColor || '#333');
            
            return (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`w-full flex items-center gap-3 p-3 transition-colors text-left hover:bg-secondary ${
                  isSelected ? "bg-secondary" : ""
                }`}
              >
                <div className="relative">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0"
                    style={{ backgroundColor: avatarColor }}
                  >
                    {chat.avatarUrl ? (
                      <img src={chat.avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      displayName[0].toUpperCase()
                    )}
                  </div>
                  {chat.isPinned && (
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                      <div className="bg-primary p-0.5 rounded-full">
                        <Pin size={10} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold truncate pr-2">{displayName}</h3>
                    {lastMessage && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: false }).replace('about ', '')}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-sm truncate ${chat.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {lastMessage ? (
                        lastMessage.type === 'text' ? lastMessage.text : `[${lastMessage.type}]`
                      ) : "No messages"}
                    </p>
                    <div className="flex items-center gap-1 shrink-0">
                      {chat.isMuted && <VolumeX size={14} className="text-muted-foreground" />}
                      {chat.unreadCount > 0 && (
                        <div className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
