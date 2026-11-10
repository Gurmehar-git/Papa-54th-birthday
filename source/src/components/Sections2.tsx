import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Shuffle, Sparkles } from "lucide-react";
import { IMAGES, MEMORIES, filled, type Memory } from "@/data/memories";
import { LETTERS, REASONS, SON_LETTER } from "@/data/content";
import { PhotoCard } from "./PhotoCard";
import { HeartDoodle, useViewer } from "./viewer";
import { Reveal, SecretHeart, SectionTitle } from "./Chrome";
import { goldConfetti } from "./confetti";

const byId = (id: string) => MEMORIES.find((m) => m.id === id)!;

/* ---------- IV. Before He Was Papa ---------- */
const SPREADS: { heading: string; memory: Memory }[][] = [
  [{ heading: "The Original Main Character", memory: byId("by-the-lake") }, { heading: "The Young Dreamer", memory: byId("mountain-road") }],
  [{ heading: "Little Papa", memory: byId("slot-10") }, { heading: "A Sweet Celebration", memory: byId("cake-celebration") }],
];
const ALBUM = SPREADS.flat().map((s) => s.memory);

export function BeforePapa() {
  const { open } = useViewer();
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const turn = (d: number) => { setDir(d); setPage((p) => Math.min(SPREADS.length - 1, Math.max(0, p + d))); };
  const tn = byId("mountain-road");
  return (
    <section id="before-papa" className="relative overflow-hidden bg-ivory px-5 py-28 sm:px-8 grain">
      <SecretHeart n={1} className="left-[6%] bottom-24" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle eyebrow="Chapter IV · The early pages" title="Before He Was Papa…" sub="He was once a little boy with big dreams, a mischievous smile, and a whole life waiting to happen." />

        <Reveal className="mt-16">
          <div className="relative mx-auto max-w-5xl rounded-md bg-navy p-3 shadow-lift sm:p-5" style={{ perspective: 2000 }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={page} custom={dir}
                initial={{ rotateY: dir * -70, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: dir * 70, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0.1, 0.2, 1] }} style={{ transformOrigin: dir > 0 ? "left center" : "right center" }}
                className="grid gap-px overflow-hidden rounded-sm bg-gold/30 md:grid-cols-2">
                {SPREADS[page]!.map((s, i) => (
                  <div key={s.heading} className={`aged-paper p-6 sm:p-10 ${i === 0 ? "md:shadow-[inset_-18px_0_30px_-20px_oklch(0.3_0.03_60/0.5)]" : "md:shadow-[inset_18px_0_30px_-20px_oklch(0.3_0.03_60/0.5)]"}`}>
                    <p className="font-hand text-3xl text-rose">{s.heading}</p>
                    <div className="mx-auto mt-6 max-w-xs">
                      <PhotoCard m={s.memory} prefix="album" onOpen={() => open(ALBUM, s.memory.id, "album")} aspect="aspect-[4/5]" />
                    </div>
                    <p className="mt-6 text-center font-display text-lg italic text-charcoal/75">{s.memory.caption}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex items-center justify-between text-ivory">
              <button onClick={() => turn(-1)} disabled={page === 0} className="inline-flex min-h-11 items-center gap-1 px-3 text-sm disabled:opacity-30"><ChevronLeft className="size-4" /> Previous page</button>
              <span className="font-hand text-xl text-gold">page {page + 1} of {SPREADS.length}</span>
              <button onClick={() => turn(1)} disabled={page === SPREADS.length - 1} className="inline-flex min-h-11 items-center gap-1 px-3 text-sm disabled:opacity-30">Turn page <ChevronRight className="size-4" /></button>
            </div>
          </div>
        </Reveal>

        {tn.thenNowImage && (
          <Reveal className="mx-auto mt-24 max-w-4xl text-center">
            <h3 className="text-4xl text-navy sm:text-5xl">That Smile Never Changed</h3>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-10">
              {[{ src: tn.image!, l: "Then", r: -2, f: "sepia(.3)" }, { src: tn.thenNowImage, l: "Now", r: 2, f: "none" }].map((p) => (
                <button key={p.l} onClick={() => open(MEMORIES, tn.id)} className="bg-paper p-2 pb-12 shadow-photo transition hover:shadow-lift sm:p-3 sm:pb-14" style={{ rotate: `${p.r}deg` }}>
                  <img src={p.src} alt={`Papa — ${p.l}`} className="aspect-[4/5] w-full object-cover" style={{ filter: p.f }} />
                  <span className="mt-2 block font-hand text-3xl text-charcoal">{p.l}</span>
                </button>
              ))}
            </div>
            <p className="mt-8 font-hand text-3xl text-rose">Different years. Same wonderful smile.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- V. All the Love ---------- */
export function Love() {
  const { open } = useViewer();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const family = MEMORIES.filter((m) => m.category === "Family" && m.image);
  return (
    <section id="love" className="relative bg-beige px-5 py-28 sm:px-8 grain">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle eyebrow="Chapter V · A letter" title="All the Love You've Given" sub="Some of the greatest things you've given us were never wrapped in paper." />

        <div className="mx-auto mt-16 max-w-sm">
          {LETTERS.map((l, i) => (
            <Reveal key={l.from} delay={i * 0.1}>
              <button onClick={() => setOpenIdx(i)} className="group relative block aspect-[3/2] w-full" aria-label={`Open letter ${l.from}`}>
                <div className="absolute inset-0 rounded-sm bg-paper shadow-photo transition group-hover:shadow-lift group-hover:-translate-y-1" />
                <svg viewBox="0 0 300 200" className="absolute inset-0 size-full transition group-hover:-translate-y-1" aria-hidden preserveAspectRatio="none">
                  <path d="M0 0 L150 112 L300 0" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
                  <path d="M0 200 L120 95 M300 200 L180 95" fill="none" stroke="var(--border)" strokeWidth="1" />
                </svg>
                <span className="absolute left-1/2 top-[52%] grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose font-display text-xl text-paper shadow-photo transition group-hover:-translate-y-[60%]">{l.seal}</span>
                <span className="absolute inset-x-0 bottom-4 text-center font-hand text-2xl text-charcoal transition group-hover:-translate-y-1">{l.from}</span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <p className="text-center font-hand text-3xl text-rose">the people you love most</p>
          <div className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
            {family.map((m) => (
              <button key={m.id} onClick={() => open(family, m.id)} className="mb-3 block w-full break-inside-avoid bg-paper p-1.5 shadow-photo transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-gold">
                <img src={m.image} alt={m.title} loading="lazy" className="block h-auto w-full" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-navy-deep/80 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)} role="dialog" aria-modal="true" aria-label={LETTERS[openIdx]!.from}>
            <motion.article onClick={(e) => e.stopPropagation()}
              initial={{ scaleY: 0.05, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} exit={{ scaleY: 0.05, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.3, 0.8, 0.2, 1] }} style={{ transformOrigin: "top" }}
              className="relative w-full max-w-xl p-8 text-charcoal shadow-lift paper-texture sm:p-12">
              <p className="eyebrow text-gold">{LETTERS[openIdx]!.from}</p>
              {LETTERS[openIdx]!.body ? (
                <p className="mt-6 whitespace-pre-line font-hand text-2xl leading-snug sm:text-3xl">{LETTERS[openIdx]!.body}</p>
              ) : (
                <div className="mt-6 border border-dashed border-gold/60 p-8 text-center">
                  <HeartDoodle className="mx-auto size-8 text-rose" />
                  <p className="mt-4 font-display text-2xl italic">A letter waiting to be written</p>
                  <p className="mt-2 text-sm text-muted-foreground">Someone special will fill these lines soon.</p>
                </div>
              )}
              <button onClick={() => setOpenIdx(null)} className="mt-8 text-sm text-navy underline decoration-gold underline-offset-4">Fold the letter</button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- VI. Unscripted ---------- */
export function Unscripted() {
  const { open } = useViewer();
  const candid = filled(MEMORIES.filter((m) => m.category === "Candid Moments" || m.category === "Celebrations"));
  return (
    <section id="unscripted" className="relative overflow-hidden bg-charcoal px-5 py-28 text-ivory sm:px-8 grain-light">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionTitle dark eyebrow="Chapter VI · Contact sheet" title="The Unscripted Moments" sub="Because the best memories were never planned." />
        <div className="mt-16 overflow-x-auto pb-4">
          <div className="mx-auto flex w-max gap-0 bg-navy-deep px-2 py-8 [background-image:repeating-linear-gradient(90deg,var(--ivory)_0_10px,transparent_10px_26px),repeating-linear-gradient(90deg,var(--ivory)_0_10px,transparent_10px_26px)] [background-position:0_8px,0_calc(100%-8px)] [background-repeat:repeat-x] [background-size:26px_10px]">
            {candid.map((m, i) => (
              <button key={m.id} onClick={() => open(candid, m.id, "strip")} className="group relative mx-2 w-56 shrink-0 bg-charcoal p-1 sm:w-72" aria-label={`Open memory: ${m.title}`}>
                <img src={m.image} alt={m.title} loading="lazy" className="aspect-[4/3] w-full object-cover grayscale-[.35] transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]" />
                <span className="mt-2 flex justify-between px-1 font-mono text-[0.65rem] tracking-widest text-gold/80">
                  <span>{String(i + 1).padStart(2, "0")}A</span><span className="font-hand text-base normal-case tracking-normal text-ivory/80">{m.caption.split(" ").slice(0, 4).join(" ")}…</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => open(candid, candid[Math.floor(Math.random() * candid.length)]!.id, "strip")}
            className="inline-flex items-center gap-2 rounded-full border border-gold px-6 py-3 text-sm text-gold transition hover:bg-gold hover:text-navy-deep">
            <Shuffle className="size-4" /> Random Funny Memory
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- VII. 35,000 feet ---------- */
export function Window() {
  const [home, setHome] = useState(false);
  return (
    <section id="35000-feet" className="relative overflow-hidden bg-navy px-5 py-28 text-ivory sm:px-8 grain-light">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-gold">Chapter VII · A small surprise</p>
          <h2 className="mt-4 text-5xl leading-[1.02] sm:text-6xl">A Little Surprise at 35,000 Feet</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/75">
            You've travelled so far, worked so hard, and given so much. Through every busy day and every journey, you've always been our constant.
          </p>
          <AnimatePresence>
            {home && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <p className="mt-8 font-display text-3xl italic text-gold-soft">No matter how far the journey, there's nothing quite like coming home.</p>
                <a href="#memory-room" className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm text-navy-deep hover:bg-gold-soft">Back to Our Memories</a>
              </motion.div>
            )}
          </AnimatePresence>
          {!home && <p className="mt-8 font-hand text-2xl text-gold-soft">← tap the window</p>}
        </Reveal>
        <Reveal delay={0.1} className="cabin-display">
          <button type="button" onClick={() => setHome((h) => !h)} aria-pressed={home}
            aria-label={home ? "Show the sky again" : "Look out of the window"} className="cabin-window">
            <span className="cabin-recess">
              <span className="cabin-glass">
                <span className="cabin-sky" aria-hidden="true">
                  <svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="wing-light" x1="0" x2="0.8" y1="0" y2="1">
                        <stop stopColor="#f2f5f9" /><stop offset="1" stopColor="#798895" />
                      </linearGradient>
                    </defs>
                    <path d="M-40 332 208 238 240 211 231 243 41 356Z" fill="url(#wing-light)" />
                    <path d="M-40 338 208 240 231 243 41 356Z" fill="#6e7d8b" />
                    <path d="M9 325 118 283 136 284 32 334Z" fill="#b8c3cc" />
                  </svg>
                </span>
                <AnimatePresence>
                  {home && <motion.img src={IMAGES.cabinPortrait} alt="Papa sitting in his airplane seat"
                    className="absolute inset-0 size-full bg-navy-deep object-cover object-[center_75%]"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.65 }} />}
                </AnimatePresence>
              </span>
            </span>
            <span className="cabin-latch" aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- VIII. 54 reasons ---------- */
export function Reasons() {
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [current, setCurrent] = useState<number | null>(null);
  const show = (i: number) => { setCurrent(i); setOpened((o) => new Set(o).add(i)); };
  const surprise = () => {
    const un = REASONS.map((_, i) => i).filter((i) => !opened.has(i));
    const pool = un.length ? un : REASONS.map((_, i) => i);
    show(pool[Math.floor(Math.random() * pool.length)]);
  };
  const rot = useMemo(() => REASONS.map((_, i) => ((i * 37) % 7) - 3), []);
  return (
    <section id="54-reasons" className="relative bg-ivory px-5 py-28 sm:px-8 grain">
      <SecretHeart n={2} className="right-[10%] bottom-16" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle eyebrow="Chapter VIII · Keepsakes" title="54 Little Reasons We Love You" sub="Truthfully, we could never stop at 54." />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <span className="font-hand text-2xl text-rose">{opened.size} of 54 opened</span>
          <button onClick={surprise} className="inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm text-navy hover:bg-navy hover:text-ivory">
            <Sparkles className="size-4 text-gold" /> Surprise Me
          </button>
        </div>
        <ul className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-9">
          {REASONS.map((_, i) => (
            <li key={i}>
              <button onClick={() => show(i)} aria-label={`Reason ${i + 1}${opened.has(i) ? " (opened)" : ""}`}
                className={`relative grid aspect-square w-full place-items-center rounded-sm shadow-photo transition hover:-translate-y-1 hover:shadow-lift ${opened.has(i) ? "bg-beige text-charcoal/50" : "paper-texture text-navy"}`}
                style={{ rotate: `${rot[i] * 0.6}deg` }}>
                <span aria-hidden className="absolute right-0 top-0 size-4 bg-gradient-to-bl from-beige to-paper shadow-sm [clip-path:polygon(0_0,100%_100%,0_100%)]" />
                <span className="font-display text-2xl sm:text-3xl">{i + 1}</span>
                {opened.has(i) && <HeartDoodle className="absolute bottom-1.5 size-3 text-rose" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {current !== null && (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCurrent(null)} role="dialog" aria-modal="true" aria-label={`Reason ${current + 1}`}>
            <motion.div key={current} onClick={(e) => e.stopPropagation()} initial={{ rotateX: -80, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 60, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.3, 0.8, 0.2, 1] }} style={{ transformOrigin: "top" }}
              className="w-full max-w-md p-10 text-center shadow-lift paper-texture">
              <p className="font-display text-6xl text-gold">{current + 1}</p>
              <p className="mt-6 font-hand text-3xl leading-snug text-charcoal">{REASONS[current]}</p>
              <div className="mt-8 flex justify-center gap-2">
                <button onClick={() => show((current + 53) % 54)} className="min-h-11 rounded-full border border-border px-4 text-sm">← Prev</button>
                <button onClick={() => setCurrent(null)} className="min-h-11 rounded-full bg-navy px-5 text-sm text-ivory">Close</button>
                <button onClick={() => show((current + 1) % 54)} className="min-h-11 rounded-full border border-border px-4 text-sm">Next →</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- IX. Finale ---------- */
export function Finale() {
  const paras = SON_LETTER.split("\n\n");
  const frame = filled(MEMORIES).slice(0, 6);
  return (
    <section id="one-thing" className="relative overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-charcoal px-5 pb-32 pt-28 text-ivory sm:px-8 grain-light">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {frame.map((m, i) => (
          <motion.img key={m.id} src={m.image} alt="" className="absolute w-40 bg-paper p-1.5 pb-6 opacity-40 shadow-lift"
            style={{ top: `${10 + (i % 3) * 28}%`, [i < 3 ? "left" : "right"]: "3%", rotate: `${i % 2 ? 6 : -5}deg` }}
            animate={{ y: [0, -10, 0] }} transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-2xl">
        <SectionTitle dark eyebrow="Chapter IX · The last page" title="If I Could Tell You One Thing…" />
        <article className="mt-16 space-y-6 rounded-sm p-8 text-charcoal shadow-lift paper-texture sm:p-14">
          {paras.map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 1, delay: 0.1 }}
              className={`whitespace-pre-line font-hand text-2xl leading-snug sm:text-[1.75rem] ${i === paras.length - 1 ? "text-right text-rose" : ""}`}>
              {p}
            </motion.p>
          ))}
        </article>
        <Reveal className="mt-28 text-center">
          <p className="text-5xl leading-tight sm:text-7xl">54 years of you.</p>
          <p className="text-5xl italic leading-tight text-gold-shine sm:text-7xl">A lifetime of us.</p>
          <p className="mt-12 eyebrow text-base text-ivory/80">Happy Birthday, Papa ❤️</p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <button onClick={() => void goldConfetti()} className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-navy-deep hover:bg-gold-soft">Celebrate 🎉</button>
            <a href="#memory-room" className="rounded-full border border-ivory/30 px-7 py-3.5 text-sm hover:border-gold hover:text-gold">Relive the Memories</a>
          </div>
          <p className="mt-20 font-hand text-xl text-ivory/40">made with love, for November 9, 2026</p>
        </Reveal>
      </div>
    </section>
  );
}
