import React, { useState } from "react";
import { useGetGiftCatalog, useGetSentGifts, useGetReceivedGifts, GiftItem } from "@workspace/api-client-react";
import { Sparkles, ArrowUpRight, ArrowDownLeft, Gift as GiftIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Gifts() {
  const { data: catalog, isLoading: catalogLoading } = useGetGiftCatalog();
  const { data: receivedGifts, isLoading: receivedLoading } = useGetReceivedGifts();
  const { data: sentGifts, isLoading: sentLoading } = useGetSentGifts();
  
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-600 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]';
      case 'epic': return 'from-purple-500 to-pink-600 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
      case 'rare': return 'from-blue-400 to-cyan-600 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
      default: return 'from-slate-400 to-slate-600 border-slate-500/50';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
      <header className="h-16 border-b border-border flex items-center px-6 justify-between bg-card/80 backdrop-blur-md z-10 shrink-0">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <GiftIcon className="text-primary" /> Gifts
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 w-full mx-auto scrollbar-thin">
        <Tabs defaultValue="catalog" className="w-full max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card border border-border h-12 p-1">
              <TabsTrigger value="catalog" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-lg transition-all">
                <Sparkles size={16} className="mr-2" /> Catalog
              </TabsTrigger>
              <TabsTrigger value="received" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-lg transition-all">
                <ArrowDownLeft size={16} className="mr-2" /> Received
              </TabsTrigger>
              <TabsTrigger value="sent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-lg transition-all">
                <ArrowUpRight size={16} className="mr-2" /> Sent
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="catalog" className="mt-0 outline-none">
            {catalogLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-48 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {catalog?.map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGift(item)}
                    className={`relative p-[1px] rounded-2xl cursor-pointer overflow-hidden group bg-gradient-to-br ${getRarityColor(item.rarity)}`}
                  >
                    <div className="bg-card/90 backdrop-blur-xl w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center relative z-10 transition-colors group-hover:bg-card/80">
                      <motion.span 
                        className="text-6xl mb-4 filter drop-shadow-lg inline-block"
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        {item.emoji}
                      </motion.span>
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 font-medium text-sm">
                        <Sparkles size={14} />
                        {item.stars} stars
                      </div>
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/30 border border-white/10 backdrop-blur-md">
                        {item.rarity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ... Received and Sent tabs would follow similar patterns ... */}
          <TabsContent value="received" className="mt-0">
            <div className="text-center text-muted-foreground mt-20">
              <p>You haven't received any gifts yet.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="sent" className="mt-0">
            <div className="text-center text-muted-foreground mt-20">
              <p>You haven't sent any gifts yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedGift} onOpenChange={() => setSelectedGift(null)}>
        <DialogContent className="sm:max-w-md border-none bg-transparent shadow-none">
          {selectedGift && (
            <div className={`p-[1px] rounded-3xl bg-gradient-to-br ${getRarityColor(selectedGift.rarity)} relative overflow-hidden`}>
              {/* Optional: Add animated background elements based on rarity */}
              <div className="bg-card w-full h-full rounded-3xl p-8 flex flex-col items-center text-center relative z-10">
                <span className="text-8xl mb-6 filter drop-shadow-2xl">{selectedGift.emoji}</span>
                <h2 className="text-3xl font-bold mb-2">{selectedGift.name}</h2>
                <p className="text-muted-foreground mb-6 max-w-sm">{selectedGift.description}</p>
                
                <div className="flex items-center justify-between w-full p-4 rounded-xl bg-black/20 border border-white/5 mb-6">
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Rarity</span>
                    <span className="capitalize font-medium">{selectedGift.rarity}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Price</span>
                    <span className="flex items-center gap-1 text-yellow-500 font-bold">
                      <Sparkles size={16} /> {selectedGift.stars}
                    </span>
                  </div>
                </div>
                
                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,188,212,0.4)]">
                  Send Gift
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
