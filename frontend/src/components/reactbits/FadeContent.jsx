// Adapted from DavidHDev/react-bits FadeContent (MIT + Commons Clause)
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FadeContent({
  children,
  blur = false,
  duration = 0.7,
  ease = "power2.out",
  delay = 0,
  threshold = 0.08,
  initialOpacity = 0,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { autoAlpha: 1, filter: "blur(0px)" });
      return undefined;
    }

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? "blur(8px)" : "blur(0px)",
      willChange: "opacity, filter, transform",
    });

    const tween = gsap.to(el, {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [blur, duration, ease, delay, threshold, initialOpacity]);

  return <div ref={ref} className={className}>{children}</div>;
}
