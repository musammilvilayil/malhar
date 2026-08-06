import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const institutions = [
  { name: "Model Academy", image: "/assets/1-6-1-360x260.jpg" },
  { name: "She Buds", image: "/assets/she-garden.png" },
  { name: "Malhar Hifz", image: "/assets/web-slide-1-2048x909.webp" },
  { name: "MIID", image: "/assets/collage of sharee'a.png" },
  
  { name: "Shareath College", image: "/assets/institute of islamic miid.webp" },
  { name: "English School", image: "/assets/english-school.webp" },
];

export default function InstitutionStack() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const ctxRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0,
          scale: 0.94,
          zIndex: institutions.length - i,
          willChange: 'transform, opacity, zIndex',
        });
      });

      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=' + institutions.length * 480,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        tlRef.current.to(
          card,
          {
            opacity: 1,
            y: i * 120,
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          i * 0.3
        );
      });
    });

    return () => {
      tlRef.current?.scrollTrigger?.kill?.();
      tlRef.current?.kill?.();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctxRef.current?.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Institutions</h2>
        <div className="relative h-[720px]">
          {institutions.map((inst, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute left-1/2 top-0 w-[min(92%,560px)] -translate-x-1/2 rounded-[2rem] bg-white shadow-2xl overflow-hidden border border-charcoal/10"
              style={{ zIndex: institutions.length - i, top: 0, willChange: 'transform, opacity, z-index', opacity: 0 }}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${inst.name === 'Shareath College' || inst.name === 'English School' ? 'object-right' : ''}`}
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-emerald-800 mb-4">{inst.name}</h3>
                <p className="text-gray-600 leading-relaxed">World-class Islamic and secular education shaped for every stage of learning.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
