import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Music, VolumeX } from "lucide-react";
import { HeartDoodle } from "./viewer";

export const SECTIONS = [
  { id: "dear-papa", label: "Dear Papa" },
  { id: "memory-room", label: "Memory Room" },
  { id: "once-upon-a-time", label: "Timeline" },
  { id: "before-papa", label: "Before Papa" },
  { id: "love", label: "Love" },
  { id: "unscripted", label: "Unscripted" },
  { id: "35000-feet", label: "35,000 ft" },
  { id: "54-reasons", label: "54 Reasons" },
  { id: "one-thing", label: "One Thing" },
];

export function Nav() {
  const [active, setActive] = useState("dear-papa");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    const onS = () => setScrolled(window.scrollY > 40);
    onS(); window.addEventListener("scroll", onS, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener("scroll", onS); };
  }, []);
  const dark = ["dear-papa", "35000-feet", "one-thing", "unscripted"].includes(active);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? (dark ? "bg-navy-deep/80 backdrop-blur-md" : "bg-ivory/85 backdrop-blur-md shadow-photo") : ""}`}>
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-8" aria-label="Chapters">
        <a href="#dear-papa" className={`min-w-0 truncate font-display text-xl italic ${dark ? "text-ivory" : "text-navy"}`}>
          The Wonderful Life of Papa
        </a>
        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 xl:flex">
            {SECTIONS.slice(2).map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition ${active === s.id ? "text-gold" : dark ? "text-ivory/70 hover:text-ivory" : "text-charcoal/70 hover:text-charcoal"}`}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#memory-room" className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-medium tracking-wide text-navy-deep transition hover:bg-gold-soft">
            Memory Room
          </a>
          <MusicToggle dark={dark} />
        </div>
      </nav>
      <div className="h-px w-full bg-gold/0" />
      <p className={`sr-only`} aria-live="polite">Current chapter: {SECTIONS.find((s) => s.id === active)?.label}</p>
    </header>
  );
}

function MusicToggle({ dark }: { dark: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setError(false);
    audio.volume = 0.5;
    try { await audio.play(); }
    catch { if (audio.paused) setError(true); }
  };
  return (
    <div className="relative">
      <audio ref={audioRef} src="./music/tere-bina-na-guzara.mp3" loop preload="none"
        onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setError(true); }} />
      <button type="button" onClick={toggle}
        aria-label={playing ? "Pause birthday music" : "Play birthday music"} aria-pressed={playing}
        title="Tere Bina Na Guzara E · Satinder Sartaaj"
        className={`grid size-9 place-items-center rounded-full border transition ${dark ? "border-ivory/25 text-ivory" : "border-charcoal/20 text-charcoal"} hover:border-gold hover:text-gold`}>
        {playing ? <Music className="size-4" /> : <VolumeX className="size-4" />}
      </button>
      {error && <p role="status" className="absolute right-0 top-11 w-48 rounded-md bg-paper p-3 text-xs text-charcoal shadow-lift">The song couldn’t play. Tap to try again.</p>}
    </div>
  );
}

const SECRETS = [
  "You found a secret! Papa's hugs are rated 54/10.",
  "Hidden fact: the house is always quieter (and less fun) when you're travelling.",
  "Secret heart #3: we love you more than ladoos. And that's saying something.",
];
export function SecretHeart({ n, className = "" }: { n: number; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={`absolute z-20 ${className}`}>
      <button onClick={() => setOpen((o) => !o)} aria-label="A tiny hidden heart"
        className="grid size-8 place-items-center opacity-40 transition hover:scale-125 hover:opacity-100">
        <HeartDoodle className="size-4 text-rose" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="absolute left-1/2 top-9 block w-56 -translate-x-1/2 rounded-md bg-paper p-3 text-center font-hand text-xl text-charcoal shadow-lift">
            {SECRETS[n % SECRETS.length]}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, sub, dark = false }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="eyebrow text-gold">{eyebrow}</p>
      <h2 className={`mt-4 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl ${dark ? "text-ivory" : "text-navy"}`}>{title}</h2>
      <div className="mx-auto mt-6 h-px w-16 bg-gold" />
      {sub && <p className={`mt-6 font-display text-xl italic sm:text-2xl ${dark ? "text-ivory/75" : "text-charcoal/75"}`}>{sub}</p>}
    </Reveal>
  );
}
