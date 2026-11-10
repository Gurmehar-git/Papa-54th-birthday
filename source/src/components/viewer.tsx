import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, Heart, Pause, Play, RotateCcw, X, ZoomIn, ZoomOut, Columns2 } from "lucide-react";
import { filled, type Memory } from "@/data/memories";

type Ctx = {
  open: (list: Memory[], id: string, layoutPrefix?: string) => void;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
};
const ViewerCtx = createContext<Ctx | null>(null);
export const useViewer = () => {
  const c = useContext(ViewerCtx);
  if (!c) throw new Error("useViewer outside provider");
  return c;
};

const FAV_KEY = "papa54-favorites";

export function ViewerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ list: Memory[]; index: number; prefix: string } | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch { /* ignore */ }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem(FAV_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const open = useCallback((list: Memory[], id: string, prefix = "g") => {
    const l = filled(list);
    const index = l.findIndex((m) => m.id === id);
    if (index >= 0) setState({ list: l, index, prefix });
  }, []);

  const value = useMemo(() => ({ open, favorites, toggleFavorite }), [open, favorites, toggleFavorite]);

  return (
    <ViewerCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {state && (
          <Lightbox
            key="lb"
            list={state.list}
            index={state.index}
            prefix={state.prefix}
            setIndex={(i) => setState((s) => (s ? { ...s, index: i } : s))}
            onClose={() => setState(null)}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </AnimatePresence>
    </ViewerCtx.Provider>
  );
}

function Lightbox({
  list, index, prefix, setIndex, onClose, favorites, toggleFavorite,
}: {
  list: Memory[]; index: number; prefix: string; setIndex: (i: number) => void; onClose: () => void;
  favorites: Set<string>; toggleFavorite: (id: string) => void;
}) {
  const m = list[index]!;
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [thenNow, setThenNow] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [audioError, setAudioError] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(0);
  const [first, setFirst] = useState(true);

  const go = useCallback((d: number) => {
    if (list.length < 2) return;
    setDir(d);
    setFirst(false);
    setIndex((index + d + list.length) % list.length);
  }, [index, list.length, setIndex]);

  useEffect(() => { setFlipped(false); setThenNow(false); setZoom(false); setPlaying(false); setAudioError(false); }, [index]);

  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, [m.id]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prevFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const muted: HTMLElement[] = [];
    for (let node: HTMLElement | null = dialog; node && node !== document.body; node = node.parentElement) {
      for (const sibling of Array.from(node.parentElement?.children ?? [])) {
        if (sibling !== node && sibling instanceof HTMLElement && !sibling.inert) {
          sibling.inert = true;
          muted.push(sibling);
        }
      }
    }
    closeRef.current?.focus();
    return () => {
      muted.forEach((node) => { node.inert = false; });
      document.body.style.overflow = prevOverflow;
      (prevFocus?.isConnected ? prevFocus : document.querySelector<HTMLElement>("#memory-room button[aria-pressed='true']"))?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [])
          .filter((button) => button.getClientRects().length > 0);
        const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
        if (current < 0 || (e.shiftKey ? current === 0 : current === buttons.length - 1)) {
          e.preventDefault();
          (e.shiftKey ? buttons[buttons.length - 1] : buttons[0])?.focus();
        }
      } else if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const toggleAudio = async () => {
    if (!m.audioUrl) return;
    const audio = audioRef.current ?? new Audio(m.audioUrl);
    audioRef.current = audio;
    audio.onended = () => setPlaying(false);
    setAudioError(false);
    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      if (audioRef.current === audio) setPlaying(true);
    } catch {
      if (audioRef.current === audio) {
        setPlaying(false);
        setAudioError(true);
      }
    }
  };

  const fav = favorites.has(m.id);
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
  const btn = "inline-flex min-h-11 items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory/90 transition hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-gold";

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Memory: ${m.title}`}
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-navy-deep/95 text-ivory backdrop-blur-sm grain-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.35 }}
    >
      <div className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="eyebrow text-gold">{counter}</span>
        <button ref={closeRef} onClick={onClose} className={btn} aria-label="Close memory">
          <X className="size-4" /> <span className="hidden sm:inline">Close Memory</span>
        </button>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-4 pb-6 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Photo stage */}
        <div className="relative flex min-h-[35svh] min-w-0 lg:min-h-[50svh] items-center justify-center">
          <button onClick={() => go(-1)} disabled={list.length < 2} aria-label="Previous photo" className="absolute left-0 z-20 hidden size-12 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-gold hover:text-navy-deep sm:grid">
            <ChevronLeft />
          </button>
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.div
              key={m.id + (thenNow ? "-tn" : "")}
              custom={dir}
              initial={first || reduce ? false : { opacity: 0, x: dir * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : dir * -80 }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
              drag={list.length < 2 || zoom || thenNow ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => { if (info.offset.x < -70) go(1); else if (info.offset.x > 70) go(-1); }}
              className="w-full"
              style={{ perspective: 1600, touchAction: zoom || thenNow ? "auto" : "pan-y" }}
            >
              {thenNow && m.thenNowImage ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  {[{ src: m.image!, label: "Then" }, { src: m.thenNowImage, label: "Now" }].map((p, i) => (
                    <motion.figure key={p.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="bg-paper p-2 pb-10 shadow-lift sm:p-3 sm:pb-14" style={{ rotate: i ? 1.5 : -1.5 }}>
                      <img src={p.src} alt={`${m.title} — ${p.label}`} className={`aspect-[4/5] w-full object-contain ${i === 0 ? "sepia-[.25]" : ""}`} />
                      <figcaption className="mt-2 text-center font-hand text-2xl text-charcoal sm:text-3xl">{p.label}</figcaption>
                    </motion.figure>
                  ))}
                  <p className="col-span-2 text-center font-hand text-2xl text-gold-soft sm:text-3xl">{m.thenNowCaption ?? "Different years. Same wonderful smile."}</p>
                </div>
              ) : (
                <motion.div
                  {...(reduce ? {} : { layoutId: `${prefix}-${m.id}` })}
                  className="relative mx-auto w-fit preserve-3d"
                  animate={reduce ? {} : { rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.8, ease: [0.3, 0.7, 0.2, 1] }}
                >
                  {/* front */}
                  <div className={`backface-hidden bg-paper p-2 shadow-lift sm:p-3 ${reduce && flipped ? "opacity-0" : ""} transition-opacity`}>
                    <div className={`overflow-hidden ${zoom ? "cursor-zoom-out" : ""}`} onClick={() => zoom && setZoom(false)}>
                      <img
                        src={m.image}
                        alt={m.title}
                        draggable={false}
                        className={`max-h-[58svh] w-auto max-w-full select-none object-contain transition-transform duration-500 ${zoom ? "scale-[1.9]" : ""} ${m.vintage ? "sepia-[.12]" : ""}`}
                        style={{ touchAction: zoom ? "pinch-zoom" : "pan-y" }}
                      />
                    </div>
                  </div>
                  {/* back */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center-safe gap-2 overflow-y-auto p-4 text-center text-charcoal aged-paper shadow-lift sm:p-10 ${reduce ? (flipped ? "opacity-100" : "opacity-0 pointer-events-none") : "backface-hidden"} transition-opacity`}
                    style={reduce ? {} : { transform: "rotateY(180deg)" }}
                    aria-hidden={!flipped}
                  >
                    <HeartDoodle />
                    <h3 className="font-hand text-3xl sm:text-5xl">{m.back?.title ?? m.title}</h3>
                    <p className="max-w-sm font-hand text-lg leading-snug sm:text-3xl">{m.back?.note ?? m.caption}</p>
                    {(m.back?.date || m.year) && <p className="font-hand text-lg text-muted-foreground">— {m.back?.date ?? m.year}</p>}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
          <button onClick={() => go(1)} disabled={list.length < 2} aria-label="Next photo" className="absolute right-0 z-20 hidden size-12 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-gold hover:text-navy-deep sm:grid">
            <ChevronRight />
          </button>
        </div>

        {/* Caption panel */}
        <motion.aside initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="space-y-5">
          {m.year && <p className="font-hand text-3xl text-gold">{m.year}</p>}
          <h2 aria-live="polite" className="text-4xl leading-tight sm:text-5xl">{m.title}</h2>
          <p className="text-lg text-ivory/80 italic font-display">{m.caption}</p>
          {m.story && <p className="leading-relaxed text-ivory/70">{m.story}</p>}
          {m.location && <p className="eyebrow text-ivory/50">{m.location}</p>}
          <div className="flex flex-wrap gap-2 pt-2">
            <button className={btn} onClick={() => { setFlipped((f) => !f); setZoom(false); }} aria-pressed={flipped} disabled={thenNow}>
              <RotateCcw className="size-4" /> {flipped ? "Turn Back" : "Turn Photo Over"}
            </button>
            <button className={btn} onClick={() => toggleFavorite(m.id)} aria-pressed={fav}>
              <Heart className={`size-4 ${fav ? "fill-rose text-rose" : ""}`} /> {fav ? "Favourite" : "Favorite Memory"}
            </button>
            {m.thenNowImage && (
              <button className={btn} onClick={() => { setThenNow((t) => !t); setFlipped(false); setZoom(false); }} aria-pressed={thenNow}>
                <Columns2 className="size-4" /> Then & Now
              </button>
            )}
            {!thenNow && !flipped && (
              <button className={btn} onClick={() => setZoom((z) => !z)} aria-pressed={zoom}>
                {zoom ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />} {zoom ? "Zoom out" : "Zoom"}
              </button>
            )}
            {m.audioUrl && (
              <button className={btn} onClick={toggleAudio}>
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />} {playing ? "Pause Memory" : "Play Memory"}
              </button>
            )}
          </div>
          {audioError && <p role="status">This recording couldn’t be played.</p>}
          <div className="flex gap-2 sm:hidden">
            <button className={btn} onClick={() => go(-1)} disabled={list.length < 2} aria-label="Previous photo"><ChevronLeft className="size-4" /> Prev</button>
            <button className={btn} onClick={() => go(1)} disabled={list.length < 2} aria-label="Next photo">Next <ChevronRight className="size-4" /></button>
          </div>
        </motion.aside>
      </div>

      {/* thumbnails */}
      <div className="relative z-10 flex gap-2 overflow-x-auto px-4 pb-5 sm:justify-center-safe sm:px-8">
        {list.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { if (i === index) return; setDir(i > index ? 1 : -1); setFirst(false); setIndex(i); }}
            aria-label={`Go to ${t.title}`}
            aria-current={i === index}
            className={`size-14 shrink-0 overflow-hidden rounded-sm border-2 transition ${i === index ? "border-gold opacity-100" : "border-transparent opacity-50 hover:opacity-90"}`}
          >
            <img src={t.image} loading="lazy" alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export function HeartDoodle({ className = "size-10 text-rose" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 44" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
      <path d="M24 40C10 30 3 22 4 13 5 6 11 3 16 4c4 1 7 4 8 8 1-4 4-8 9-8.5C39 3 45 8 44 15c-1 9-9 16-20 25Z" />
    </svg>
  );
}
