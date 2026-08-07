import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  "/assets/DSC_2363-1-1-1.jpg",
  "/assets/about-imgs.jpg",
  "/assets/web-hifl.png",
  "/assets/Untitled-1.png",
  "/assets/web-slide-1-scaled.png",
  "/assets/GAIJpIRvuPg-maxresdefault.jpg",
];

export default function GalleryParallax() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const tweens = [];

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        const speed = 0.1 + (i % 3) * 0.05;
        const tween = gsap.to(item, {
          y: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tweens.push(tween);
      });
    }, containerRef);

    return () => {
      tweens.forEach((tween) => tween.scrollTrigger?.kill?.());
      tweens.forEach((tween) => tween.kill?.());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Campus Life</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((img, i) => (
            <div
              key={img}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className={`relative overflow-hidden rounded-2xl shadow-lg ${i % 2 === 0 ? "translate-y-12" : ""}`}
            >
              <img
                src={img}
                alt={`Campus life ${i + 1}`}
                className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
