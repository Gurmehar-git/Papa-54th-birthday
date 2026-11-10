import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { ViewerProvider } from "./components/viewer";
import { Nav } from "./components/Chrome";
import { Hero, MemoryRoom, Timeline } from "./components/Sections1";
import { BeforePapa, Love, Unscripted, Window, Reasons, Finale } from "./components/Sections2";

createRoot(document.getElementById("root")!).render(
  <MotionConfig reducedMotion="user">
    <ViewerProvider>
      <Nav />
      <main>
        <Hero />
        <MemoryRoom />
        <Timeline />
        <BeforePapa />
        <Love />
        <Unscripted />
        <Window />
        <Reasons />
        <Finale />
      </main>
    </ViewerProvider>
  </MotionConfig>,
);
