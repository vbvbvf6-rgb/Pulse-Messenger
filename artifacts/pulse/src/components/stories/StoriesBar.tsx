import React from "react";
import { useGetStories } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function StoriesBar() {
  const { data: stories, isLoading } = useGetStories();

  if (isLoading) {
    return (
      <div className="flex gap-4 p-4 overflow-x-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1 shrink-0">
            <Skeleton className="w-14 h-14 rounded-full" />
            <Skeleton className="w-10 h-3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 overflow-x-auto scrollbar-none">
      <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-muted-foreground group-hover:border-primary transition-colors text-muted-foreground group-hover:text-primary">
          <span className="text-2xl mb-1">+</span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">Add</span>
      </div>

      {stories?.map((storyGroup) => (
        <div key={storyGroup.user.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
          <div className={`w-14 h-14 rounded-full p-[2px] ${storyGroup.hasUnviewed ? 'bg-gradient-to-tr from-primary to-accent animate-pulse' : 'bg-border'}`}>
            <div 
              className="w-full h-full rounded-full border-2 border-background overflow-hidden bg-muted flex items-center justify-center font-bold text-lg text-white"
              style={{ backgroundColor: storyGroup.user.avatarColor }}
            >
              {storyGroup.user.avatarUrl ? (
                <img src={storyGroup.user.avatarUrl} alt={storyGroup.user.displayName} className="w-full h-full object-cover" />
              ) : (
                storyGroup.user.displayName[0].toUpperCase()
              )}
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-medium truncate w-16 text-center">
            {storyGroup.user.displayName.split(' ')[0]}
          </span>
        </div>
      ))}
    </div>
  );
}
