export async function goldConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const burst = document.createElement("div");
  burst.setAttribute("aria-hidden", "true");
  burst.style.cssText = "position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:200";
  document.body.append(burst);
  const colors = ["#C5A46D", "#E8D3A6", "#F8F3EA", "#C98F87"];
  for (let i = 0; i < 72; i++) {
    const piece = document.createElement("i");
    const side = i % 2 ? 1 : -1;
    const x = side * (30 + Math.random() * 360);
    const y = 90 + Math.random() * 330;
    piece.style.cssText = `position:absolute;left:${side > 0 ? 22 : 78}%;top:68%;width:6px;height:10px;background:${colors[i % 4]}`;
    burst.append(piece);
    piece.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${x / 2}px,${-y}px) rotate(150deg)`, offset: .38 },
      { transform: `translate(${x}px,40vh) rotate(420deg)`, opacity: 0 },
    ], { duration: 1350 + Math.random() * 600, easing: "ease-out", fill: "forwards" });
  }
  window.setTimeout(() => burst.remove(), 2000);
}
