import React from "react";
import { useGetStories } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

export default function Stories() {
  const { data: stories, isLoading } = useGetStories();

  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
      <header className="h-16 border-b border-border flex items-center px-6 justify-between bg-card/80 backdrop-blur-md z-10 shrink-0">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Play className="text-primary" /> Stories
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 max-w-4xl w-full mx-auto scrollbar-thin">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[9/16] rounded-2xl" />
            ))}
          </div>
        ) : stories?.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={32} className="text-muted-foreground/50 ml-1" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">No stories right now</h2>
            <p>Check back later to see updates from your contacts</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Create Story Card */}
            <div className="aspect-[9/16] rounded-2xl border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <span className="text-3xl">+</span>
              </div>
              <h3 className="font-bold text-foreground">Add Story</h3>
            </div>

            {/* Story Cards */}
            {stories?.map((group) => {
              const latestStory = group.stories[0]; // Assuming sorted by newest
              
              return (
                <div 
                  key={group.user.id} 
                  className="aspect-[9/16] rounded-2xl relative overflow-hidden cursor-pointer group bg-card border border-border"
                >
                  {/* Background/Content */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ backgroundColor: latestStory?.backgroundColor || '#111' }}
                  >
                    {latestStory?.type === 'text' && (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center">
                        <p className="text-white font-bold text-xl leading-tight">
                          {latestStory.text}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

                  {/* User Info Overlay */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex gap-1">
                      {/* Progress bars placeholder */}
                      {group.stories.map((_, i) => (
                        <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                          {i === 0 && <div className="h-full bg-white w-full" />}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full p-[2px] ${group.hasUnviewed ? 'bg-primary' : 'bg-transparent'}`}>
                        <div 
                          className="w-full h-full rounded-full border border-background overflow-hidden flex items-center justify-center text-white font-bold text-xs"
                          style={{ backgroundColor: group.user.avatarColor }}
                        >
                          {group.user.avatarUrl ? (
                            <img src={group.user.avatarUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            group.user.displayName[0].toUpperCase()
                          )}
                        </div>
                      </div>
                      <span className="text-white font-bold drop-shadow-md">{group.user.displayName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
