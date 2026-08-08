import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

// Lightweight React Bits ShinyText adaptation for Malhar's emerald/gold palette.
const ShinyText = ({ text, className = "", speed = 2.8, color = "#d8cdb8", shineColor = "#fff5cf" }) => {
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const previous = useRef(null);

  useAnimationFrame((time) => {
    if (previous.current === null) {
      previous.current = time;
      return;
    }
    elapsed.current += time - previous.current;
    previous.current = time;
    progress.set((elapsed.current % (speed * 1000)) / (speed * 10));
  });

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: "200% auto",
        backgroundPosition,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
