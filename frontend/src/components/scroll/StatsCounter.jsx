import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 25, suffix: "+", label: "Years of Excellence" },
  { number: 5000, suffix: "+", label: "Students Educated" },
  { number: 150, suffix: "", label: "Expert Faculty" },
  { number: 6, suffix: "", label: "Institutions" },
];

export default function StatsCounter() {
  const containerRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const triggers = [];
    const animations = [];

    const ctx = gsap.context(() => {
      countersRef.current.forEach((counter, i) => {
        if (!counter) return;

        const target = stats[i].number;
        const trigger = ScrollTrigger.create({
          trigger: counter,
          start: "top 85%",
          onEnter: () => {
            const obj = { val: 0 };
            const animation = gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              snap: { val: 1 },
              onUpdate: () => {
                counter.textContent = Math.round(obj.val).toLocaleString();
              },
            });
            animations.push(animation);
          },
          once: true,
        });

        triggers.push(trigger);
      });
    }, containerRef);

    return () => {
      animations.forEach((animation) => animation.kill?.());
      triggers.forEach((trigger) => trigger.kill?.());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-cream border-t border-charcoal/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center text-charcoal">
              <div ref={(el) => { countersRef.current[i] = el; }} className="text-4xl md:text-5xl font-bold mb-2 text-emerald">
                0
              </div>
              <div className="text-xl font-light text-emerald/80">{stat.suffix}</div>
              <div className="mt-2 text-charcoal/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
