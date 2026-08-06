import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

// Line-by-line masked reveal for headings
export const MaskedLines = ({ lines, className = "", delay = 0, tag: Tag = "h1" }) => (
  <Tag className={className}>
    {lines.map((line, i) => (
      <span key={i} className="line-mask">
        <motion.span
          className="block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.12 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

// Scroll-triggered fade/slide reveal
export const Reveal = ({ children, delay = 0, y = 40, className = "", once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

// Staggered container
export const Stagger = ({ children, className = "", stagger = 0.12 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", y = 50 }) => (
  <motion.div
    className={className}
    variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
  >
    {children}
  </motion.div>
);

// Parallax image inside a clipped frame
export const Parallax = ({ src, alt, className = "", amount = 60 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export const Overline = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-3 text-xs md:text-sm font-medium tracking-[0.22em] uppercase text-gold ${className}`}>
    <span className="h-px w-8 bg-gold/60" />
    {children}
  </span>
);

export const QuoteBlock = ({ arabic, translation, citation, className = "" }) => (
  <div className={`rounded-3xl border border-charcoal/10 bg-emerald-50 p-8 ${className}`}>
    <p className="font-arabic text-3xl md:text-4xl text-emerald-900 leading-relaxed" dir="rtl">{arabic}</p>
    <p className="mt-4 text-charcoal/70">{translation}{citation ? ` — ${citation}` : ""}</p>
  </div>
);

// Subtle 8-point-star Islamic geometric texture
export const GeoPattern = ({ className = "", color = "#0A4D3C", opacity = 0.04 }) => (
  <svg className={className} width="100%" height="100%" style={{ opacity }} aria-hidden="true">
    <defs>
      <pattern id={`geo-${color}`} width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M40 5 L50 30 L75 40 L50 50 L40 75 L30 50 L5 40 L30 30 Z" fill="none" stroke={color} strokeWidth="1" />
        <rect x="20" y="20" width="40" height="40" fill="none" stroke={color} strokeWidth="0.5" transform="rotate(45 40 40)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#geo-${color})`} />
  </svg>
);

export const Counter = ({ to, suffix = "", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1800;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};
