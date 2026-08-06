import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FounderParallax() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const ctxRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      tweenRef.current = gsap.to(imageRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      tweenRef.current?.scrollTrigger?.kill?.();
      ctxRef.current?.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div ref={imageRef} className="relative">
          <img
            src="/assets/Posoat-Thangal-360x370.jpg"
            alt="Sheikh Sayyid Umarul Farooq Al Bukhari (Posoat Thangal)"
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
          />
          <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl">
            <p className="text-3xl font-bold">2000</p>
            <p className="text-sm">Founded</p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Founder</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Sheikh Sayyid Umarul Farooq Al Bukhari, known as <strong className="text-emerald-700">Posoat Thangal</strong>, envisioned Malhar as a beacon of light for thousands.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Established in 2000, Malhar has grown into a comprehensive educational trust serving students from all walks of life.
          </p>
          <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-8 bg-emerald-50">
            <p className="text-2xl font-arabic text-emerald-800 mb-2" dir="rtl">طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ</p>
            <p className="text-gray-700 italic">"Seeking knowledge is obligatory upon every Muslim"</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
