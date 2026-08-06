import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const institutions = [
  { name: "Model Academy", icon: "🎓", color: "bg-blue-500" },
  { name: "MIID", icon: "🕌", color: "bg-emerald-500" },
  { name: "She Garden", icon: "🌸", color: "bg-pink-500" },
  { name: "Malhar Hifz", icon: "📖", color: "bg-amber-500" },
  { name: "Shareath College", icon: "🏛️", color: "bg-purple-500" },
  { name: "English School", icon: "📚", color: "bg-indigo-500" },
];

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const ctxRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || sectionsRef.current.length === 0) return;

    ctxRef.current = gsap.context(() => {
      tweenRef.current = gsap.to(sectionsRef.current, {
        xPercent: -100 * (sectionsRef.current.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sectionsRef.current.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth,
        },
      });
    });

    return () => {
      tweenRef.current?.scrollTrigger?.kill?.();
      tweenRef.current?.kill?.();
      ctxRef.current?.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <div className="h-screen flex items-center">
        <div className="flex" ref={(el) => (sectionsRef.current = el ? Array.from(el.children) : [])}>
          {institutions.map((inst, i) => (
            <div key={i} className="w-screen h-full flex items-center justify-center">
              <div className={`${inst.color} text-white p-16 rounded-3xl text-center mx-8`}>
                <div className="text-8xl mb-8">{inst.icon}</div>
                <h3 className="text-5xl font-bold mb-4">{inst.name}</h3>
                <p className="text-2xl opacity-80">Click to learn more →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
