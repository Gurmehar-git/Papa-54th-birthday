import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ChevronDown, Gift, Shuffle } from "lucide-react";
import { CATEGORIES, IMAGES, MEMORIES, filled, type Category } from "@/data/memories";
import { TIMELINE } from "@/data/content";
import { PhotoCard } from "./PhotoCard";
import { useViewer } from "./viewer";
import { Reveal, SecretHeart, SectionTitle } from "./Chrome";
import { goldConfetti } from "./confetti";

const LINES = ["On November 9, 1972…", "A beautiful story began.", "54 years later…", "That story has become our whole world."];

export function Hero() {
  const [surprise, setSurprise] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  return (
    <section id="dear-papa" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-dusk text-ivory grain-light">
      <div aria-hidden className="absolute -left-40 top-10 size-[40rem] rounded-full bg-gold/20 blur-3xl animate-glow" />
      <div aria-hidden className="absolute -right-40 bottom-0 size-[34rem] rounded-full bg-rose/20 blur-3xl animate-glow" style={{ animationDelay: "3s" }} />
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="space-y-1">
            {LINES.map((l, i) => (
              <motion.p key={l} initial={{ opacity: 0, y: 14, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4 + i * 0.9, duration: 1.1 }}
                className={`font-display text-2xl italic sm:text-3xl ${i % 2 ? "text-ivory" : "text-ivory/60"}`}>{l}</motion.p>
            ))}
          </div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.2, duration: 1.2 }}
            className="mt-10 text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Happy 54<sup className="text-[0.4em]">th</sup> Birthday, <span className="text-gold-shine italic">Papa.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, duration: 1 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/75">
            Here's to the memories we've made, the love you've given, and the countless beautiful moments still to come.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.5, duration: 0.8 }} className="mt-10 flex flex-wrap gap-3">
            <a href="#once-upon-a-time" className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-navy-deep transition hover:bg-gold-soft">Begin Your Story</a>
            <a href="#memory-room" className="rounded-full border border-ivory/30 px-7 py-3.5 text-sm text-ivory transition hover:border-gold hover:text-gold">Open the Memory Room</a>
            <button onClick={() => { setSurprise(true); void goldConfetti(); }} aria-label="A little birthday surprise"
              className="grid size-12 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-navy-deep">
              <Gift className="size-5" />
            </button>
          </motion.div>
          <AnimatePresence>
            {surprise && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 font-hand text-3xl text-gold-soft">
                54 candles, one wish: that you know how loved you are. ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div style={{ y }} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <span aria-hidden className="pointer-events-none absolute -top-16 right-0 select-none font-display text-[13rem] leading-none text-gold/25 sm:text-[18rem] lg:-right-8">54</span>
          <motion.figure initial={{ opacity: 0, rotate: -6, y: 40 }} animate={{ opacity: 1, rotate: -2.5, y: 0 }} transition={{ delay: 1.2, duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative bg-paper p-3 pb-16 shadow-lift">
            <img src={IMAGES.diwaliFamily} alt="Papa and Mama seated with their son and daughter standing beside them" className="aspect-[4/5] w-full bg-aged object-contain" />
            <figcaption className="absolute inset-x-4 bottom-4 font-hand text-2xl text-charcoal">Our whole world ♥</figcaption>
          </motion.figure>
          <motion.figure initial={{ opacity: 0, rotate: 10 }} animate={{ opacity: 1, rotate: 6 }} transition={{ delay: 2, duration: 1.2 }}
            className="absolute -bottom-10 -left-6 w-40 bg-aged p-2 pb-8 shadow-lift sm:w-52">
            <img src={IMAGES.hillsVintage} alt="Papa as a young man in the mountains" className="aspect-square w-full object-cover sepia-[.2]" />
            <figcaption className="absolute inset-x-2 bottom-1 font-hand text-lg text-charcoal">where it started</figcaption>
          </motion.figure>
        </motion.div>
      </div>
      <a href="#memory-room" aria-label="Scroll down" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory/60 animate-bob">
        <ChevronDown />
      </a>
      <p className="absolute bottom-6 right-6 z-10 hidden max-w-xs text-right font-display text-sm italic text-ivory/50 lg:block">
        "Some people make the world a better place simply by being in it. For us, that person is you."
      </p>
    </section>
  );
}

export function MemoryRoom() {
  const { open, favorites } = useViewer();
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number] | "Favourites">("All Memories");
  const lastRandom = useRef<string | null>(null);

  useEffect(() => {
    const h = (e: Event) => setCat((e as CustomEvent<Category>).detail);
    window.addEventListener("papa:filter", h);
    return () => window.removeEventListener("papa:filter", h);
  }, []);

  const list =
    cat === "All Memories" ? MEMORIES
    : cat === "Favourites" ? MEMORIES.filter((m) => favorites.has(m.id))
    : MEMORIES.filter((m) => m.category === cat || (cat === "Young Adulthood" && m.vintage && m.category !== "Childhood"));
  const ordered = filled(list);

  const surprise = () => {
    const pool = filled(MEMORIES);
    const choices = pool.length > 1 ? pool.filter((m) => m.id !== lastRandom.current) : pool;
    const pick = choices[Math.floor(Math.random() * choices.length)];
    if (!pick) return;
    lastRandom.current = pick.id;
    open(MEMORIES, pick.id);
  };

  return (
    <section id="memory-room" className="relative overflow-hidden bg-ivory px-5 py-28 sm:px-8 grain">
      <SecretHeart n={0} className="right-[8%] top-24" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionTitle eyebrow="Chapter II · A private exhibition" title="The Memory Room" sub="Every photograph is a door. Step through any one of them." />

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-6">
          <div role="group" aria-label="Filter memories" className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-paper/70 p-1">
            {[...CATEGORIES, "Favourites" as const].map((c) => (
              <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition ${cat === c ? "text-ivory" : "text-charcoal/70 hover:text-charcoal"}`}>
                {cat === c && <motion.span layoutId={reduce ? undefined : "cat-pill"} className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{c === "Favourites" ? `♥ ${c}` : c}</span>
              </button>
            ))}
          </div>
          <button onClick={surprise} disabled={!filled(MEMORIES).length} className="group inline-flex items-center gap-3 rounded-full border border-gold px-6 py-3 text-sm text-navy transition hover:bg-navy hover:text-ivory">
            <Shuffle className="size-4 text-gold transition group-hover:rotate-180" /> Surprise Me With a Memory
          </button>
        </Reveal>

        <motion.div layout={!reduce} className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-14">
          <AnimatePresence mode="popLayout">
            {ordered.length === 0 && (
              <p className="text-center font-hand text-3xl text-charcoal/60">{cat === "Favourites" ? "No favourites yet — tap the heart on any memory." : "No photographs in this collection yet."}</p>
            )}
            {ordered.map((m, i) => (
              <motion.div key={m.id} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : Math.min(i, 8) * 0.04 }} className="break-inside-avoid relative">
                <PhotoCard m={m} onOpen={() => open(list, m.id)}  />
                {m.featured && m.image && (
                  <span className="pointer-events-none absolute -right-2 -top-3 rotate-6 rounded-sm bg-gold px-2 py-0.5 font-hand text-lg text-navy-deep shadow-photo">favourite ★</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="mt-4 text-center font-hand text-2xl text-charcoal/60">
          {filled(MEMORIES).length} photographs in the collection
        </p>
      </div>
    </section>
  );
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const goto = (c: string) => {
    window.dispatchEvent(new CustomEvent("papa:filter", { detail: c }));
    document.getElementById("memory-room")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="once-upon-a-time" className="relative bg-beige px-5 py-28 sm:px-8 grain">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle eyebrow="Chapter III · 1972 — 2026" title="Once Upon a Time" sub="Fifty-four years, told in five chapters." />
        <div ref={ref} className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-gold/30 md:left-1/2" aria-hidden />
          <motion.div style={{ height: h }} className="absolute left-4 top-0 w-px bg-gold md:left-1/2" aria-hidden />
          <ol className="space-y-28">
            {TIMELINE.map((t, i) => {
              const img = "image" in t ? IMAGES[t.image as keyof typeof IMAGES] : undefined;
              const left = i % 2 === 0;
              return (
                <li key={t.years} className="relative grid gap-8 pl-12 md:grid-cols-2 md:gap-16 md:pl-0">
                  <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300 }}
                    className="absolute left-4 top-2 size-4 -translate-x-1/2 rounded-full border-2 border-gold bg-ivory md:left-1/2" aria-hidden />
                  <Reveal className={`${left ? "md:order-1 md:text-right" : "md:order-2"}`}>
                    <p className="font-hand text-3xl text-rose">{t.years}</p>
                    <h3 className="mt-2 text-4xl leading-tight text-navy sm:text-5xl">{t.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-charcoal/75">{t.text}</p>
                    <button onClick={() => goto(t.category)} className="mt-5 text-sm text-navy underline decoration-gold underline-offset-4 hover:text-gold">
                      See {t.category.toLowerCase()} memories →
                    </button>
                  </Reveal>
                  <Reveal delay={0.15} className={left ? "md:order-2" : "md:order-1"}>
                    {img ? (
                      <figure className="bg-paper p-2.5 pb-10 shadow-photo" style={{ rotate: left ? "1.5deg" : "-1.5deg" }}>
                        <img src={img} alt={t.title} loading="lazy" className="aspect-[4/3] w-full bg-aged object-contain" style={{ filter: `sepia(${t.tone * 0.5}) saturate(${1 - t.tone * 0.15})` }} />
                      </figure>
                    ) : (
                      <div className="grid aspect-[4/3] place-items-center border border-dashed border-gold/60 bg-aged/60 p-6 text-center sepia">
                        <span role="img" aria-label="The next memory is yet to come" className="font-display text-8xl text-navy">?</span>
                      </div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
