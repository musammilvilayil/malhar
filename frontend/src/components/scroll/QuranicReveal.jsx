import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function QuranicReveal() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const ctxRef = useRef(null);
  const tweenRef = useRef(null);

  const verse = "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ الَّذِي عَلَّمَ بِالْقَلَمِ عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ";
  const words = verse.split(/\s+/);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      tweenRef.current = gsap.fromTo(
        wordsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      tweenRef.current?.scrollTrigger?.kill?.();
      ctxRef.current?.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-emerald-50">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-6" dir="rtl">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-arabic text-emerald-800"
            >
              {word}
            </span>
          ))}
        </div>
        {/* English translation removed to display the Arabic verse only */}
      </div>
    </section>
  );
}
