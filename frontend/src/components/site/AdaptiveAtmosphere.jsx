import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = ["ا", "ل", "م", "ن", "و", "ر", "ع", "ه"];

const seeded = (i, salt = 1) => {
  const x = Math.sin(i * 91.733 + salt * 17.11) * 43758.5453;
  return x - Math.floor(x);
};

export default function AdaptiveAtmosphere() {
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(true);
  const [saveData, setSaveData] = useState(false);
  const layerRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => setCompact(window.matchMedia("(max-width: 767px), (pointer: coarse)").matches);
    update();
    window.addEventListener("resize", update, { passive: true });
    setSaveData(Boolean(navigator.connection?.saveData));
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = reduceMotion || saveData ? 0 : compact ? 34 : 82;
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    glyph: GLYPHS[i % GLYPHS.length],
    left: `${seeded(i, 1) * 100}%`,
    top: `${seeded(i, 2) * 100}%`,
    size: compact ? 10 + seeded(i, 3) * 13 : 11 + seeded(i, 3) * 20,
    opacity: compact ? 0.07 + seeded(i, 4) * 0.10 : 0.06 + seeded(i, 4) * 0.14,
    depth: 0.25 + seeded(i, 5) * 0.9,
  })), [count, compact]);

  useEffect(() => {
    if (!count) return undefined;
    let raf;

    const setTarget = (clientX, clientY) => {
      target.current.x = (clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (clientY / window.innerHeight - 0.5) * 2;
    };

    const onPointer = (e) => setTarget(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (e.touches?.[0]) setTarget(e.touches[0].clientX, e.touches[0].clientY);
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.055;
      current.current.y += (target.current.y - current.current.y) * 0.055;
      if (layerRef.current) {
        layerRef.current.style.setProperty("--atmo-x", current.current.x.toFixed(3));
        layerRef.current.style.setProperty("--atmo-y", current.current.y.toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  if (!count) return null;

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none font-serif text-gold will-change-transform"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            transform: `translate3d(calc(var(--atmo-x, 0) * ${p.depth * 18}px), calc(var(--atmo-y, 0) * ${p.depth * 14}px), 0)`,
            transition: "opacity 300ms ease",
          }}
        >
          {p.glyph}
        </span>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(197,160,89,.08),transparent_48%)]" />
    </div>
  );
}
