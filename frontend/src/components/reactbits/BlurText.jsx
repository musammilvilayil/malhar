import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes = {};
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((s) => s[key])];
  });
  return keyframes;
};

// Adapted from DavidHDev/react-bits BlurText, using this project's framer-motion dependency.
const BlurText = ({
  text = "",
  delay = 90,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.12,
  rootMargin = "0px",
  stepDuration = 0.32,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    }, { threshold, rootMargin });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const from = useMemo(() => (
    direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -30 }
      : { filter: "blur(10px)", opacity: 0, y: 30 }
  ), [direction]);

  const to = useMemo(() => [
    { filter: "blur(4px)", opacity: 0.55, y: direction === "top" ? 4 : -4 },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ], [direction]);

  const keyframes = buildKeyframes(from, to);
  const stepCount = to.length + 1;
  const times = Array.from({ length: stepCount }, (_, i) => i / (stepCount - 1));

  return (
    <span ref={ref} className={`${className} flex flex-wrap`}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={`${segment}-${index}`}
          initial={from}
          animate={inView ? keyframes : from}
          transition={{ duration: stepDuration * (stepCount - 1), times, delay: (index * delay) / 1000 }}
        >
          {segment}{animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
