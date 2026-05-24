import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";

const TENOR_KEY = "LIVDSRZULELA";

interface GifResult {
  id: string;
  url: string;
  preview: string;
  title: string;
}

async function fetchGifs(query: string): Promise<GifResult[]> {
  const endpoint = query.trim()
    ? `https://g.tenor.com/v1/search?q=${encodeURIComponent(query + " meme")}&key=${TENOR_KEY}&limit=24&contentfilter=medium&media_filter=minimal`
    : `https://g.tenor.com/v1/trending?key=${TENOR_KEY}&limit=24&contentfilter=medium&media_filter=minimal`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Tenor error");
  const data = await res.json();

  return ((data.results || []) as any[]).map((item: any) => ({
    id: item.id,
    url: item.media?.[0]?.gif?.url || item.media?.[0]?.mediumgif?.url || "",
    preview: item.media?.[0]?.tinygif?.url || item.media?.[0]?.nanogif?.url || item.media?.[0]?.gif?.url || "",
    title: item.title || "",
  })).filter((g: GifResult) => g.url);
}

interface MemeGifPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function MemeGifPicker({ onSelect, onClose }: MemeGifPickerProps) {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState<GifResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (q: string) => {
    setLoading(true);
    setError(false);
    try {
      const results = await fetchGifs(q);
      setGifs(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load("");
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => load(val), 450);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ type: "spring", damping: 26, stiffness: 320 }}
      className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-[22px] shadow-2xl overflow-hidden z-50"
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border bg-secondary/40">
        <span className="text-base shrink-0">🎭</span>
        <div className="flex-1 flex items-center gap-1.5 bg-secondary rounded-xl px-3 py-1.5">
          <Search size={13} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => handleChange(e.target.value)}
            placeholder="Поиск мемов..."
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium placeholder:text-muted-foreground/60 min-w-0"
          />
          {query && (
            <button onClick={() => handleChange("")} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={12} />
            </button>
          )}
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 px-1.5 py-0.5 bg-secondary/60 rounded-md shrink-0">GIF</span>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <X size={15} />
        </button>
      </div>

      <div className="overflow-y-auto scrollbar-none" style={{ maxHeight: "260px" }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-28 gap-2">
            <Loader2 size={22} className="animate-spin text-primary" />
            <span className="text-[12px] text-muted-foreground font-medium">Загружаем мемы...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-28 gap-2.5">
            <span className="text-2xl">😵</span>
            <p className="text-[12px] text-muted-foreground font-medium">Не удалось загрузить</p>
            <button
              onClick={() => load(query)}
              className="text-[11px] font-black text-primary hover:text-primary/80 transition-colors"
            >
              Повторить
            </button>
          </div>
        ) : gifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-28 gap-2">
            <span className="text-2xl">🔍</span>
            <p className="text-[12px] text-muted-foreground font-medium">Ничего не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 p-2">
            {gifs.map(gif => (
              <button
                key={gif.id}
                onClick={() => { onSelect(gif.url); onClose(); }}
                className="relative rounded-xl overflow-hidden hover:scale-[1.04] active:scale-[0.96] transition-transform bg-secondary border border-border/50 hover:border-primary/30"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={gif.preview || gif.url}
                  alt={gif.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-3 py-1.5 border-t border-border/50 bg-secondary/20">
        <p className="text-[9px] text-muted-foreground/40 text-center font-medium tracking-wide">Powered by Tenor</p>
      </div>
    </motion.div>
  );
}
