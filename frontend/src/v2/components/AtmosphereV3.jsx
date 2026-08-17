import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AtmosphereV3() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.22,
  });

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const root = document.documentElement;
    const handlePointer = (event) => {
      root.style.setProperty("--v3-pointer-x", `${event.clientX}px`);
      root.style.setProperty("--v3-pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [reduceMotion]);

  return (
    <div className="v3-atmosphere" aria-hidden="true">
      <motion.div
        className="v3-scroll-progress"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
      />
      <div className="v3-cursor-aura" />
      <div className="v3-edge-frame v3-edge-frame--left" />
      <div className="v3-edge-frame v3-edge-frame--right" />
    </div>
  );
}
