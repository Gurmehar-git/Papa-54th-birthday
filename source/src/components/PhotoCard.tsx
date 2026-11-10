import { motion, useReducedMotion } from "motion/react";
import { ImagePlus } from "lucide-react";
import type { Memory } from "@/data/memories";

const tilt = (id: string) => {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) | 0;
  return ((Math.abs(h) % 5) - 2) * 0.9; // -1.8..1.8deg, subtle
};

export function PhotoCard({
  m, onOpen, prefix = "g", className = "", aspect, rotate = true,
}: { m: Memory; onOpen?: () => void; prefix?: string; className?: string; aspect?: string | undefined; rotate?: boolean }) {
  const reduce = useReducedMotion();
  const frame = m.frame ?? "editorial";
  const r = rotate && frame !== "editorial" ? tilt(m.id) : 0;

  if (!m.image) {
    return (
      <div className={`flex ${aspect ?? "aspect-[4/5]"} flex-col items-center justify-center gap-2 border border-dashed border-gold/60 bg-beige/40 p-4 text-center ${className}`}>
        <ImagePlus className="size-6 text-gold" aria-hidden />
        <p className="font-hand text-xl text-charcoal/70">A memory waiting to be added</p>
        <p className="eyebrow text-[0.6rem] text-muted-foreground">{m.category}</p>
      </div>
    );
  }

  const frameCls =
    frame === "polaroid" ? "bg-paper p-2.5 pb-14 sm:p-3 sm:pb-16"
    : frame === "vintage" ? "bg-aged p-2 pb-10 rounded-[3px]"
    : "";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open memory: ${m.title}`}
      className={`group relative block w-full text-left shadow-photo transition-shadow duration-500 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${frameCls} ${className}`}
      style={{ rotate: r }}
      {...(reduce ? {} : { whileHover: { y: -6, rotate: r * 0.3, transition: { type: "spring" as const, stiffness: 300, damping: 22 } } })}
    >
      <motion.div {...(reduce ? {} : { layoutId: `${prefix}-${m.id}` })} className="relative overflow-hidden">
        <img
          src={m.image}
          alt={m.title}
          loading="lazy"
          className={`w-full object-cover transition duration-700 motion-safe:group-hover:scale-[1.03] ${aspect ?? ""} ${m.vintage ? "sepia-[.18] saturate-[.9]" : ""}`}
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center bg-gradient-to-t from-navy-deep/70 to-transparent pb-3 pt-10 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="eyebrow text-ivory">Open Memory</span>
        </span>
      </motion.div>
      {frame === "polaroid" || frame === "vintage" ? (
        <span className="absolute inset-x-3 bottom-2 flex items-baseline justify-between gap-2 font-hand text-charcoal">
          <span className="truncate text-xl">{m.title}</span>
          {m.year && <span className="shrink-0 text-lg text-rose">{m.year}</span>}
        </span>
      ) : (
        <span className="absolute -bottom-9 left-0 flex w-full items-baseline justify-between gap-2">
          <span className="truncate font-display text-lg italic text-charcoal">{m.title}</span>
          {m.year && <span className="shrink-0 font-hand text-lg text-rose">{m.year}</span>}
        </span>
      )}
    </motion.button>
  );
}
