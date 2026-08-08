import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CampusLifeV2.css";

gsap.registerPlugin(ScrollTrigger);

const moments = [
  {
    title: "Campus Assembly",
    subtitle: "Students gathering in the shared life of the campus.",
    image: "/assets/DSC_2363-1-1-1.jpg",
  },
  {
    title: "Main Campus",
    subtitle: "The learning environment at the heart of Malhar.",
    image: "/assets/web-slide-1-2048x909.webp",
  },
  {
    title: "Campus Panorama",
    subtitle: "A wider view of the spaces that connect the community.",
    image: "/assets/gal.jpg",
  },
  {
    title: "Students & Events",
    subtitle: "Moments of participation, expression and togetherness.",
    image: "/assets/gal1.jpg",
  },
  {
    title: "Learning Spaces",
    subtitle: "Everyday spaces shaped around study and growth.",
    image: "/assets/about-imgs.jpg",
  },
];

const number = (index) => String(index + 1).padStart(2, "0");

function Moment({ moment, index, mobile = false }) {
  return (
    <article className={mobile ? "v2-campus__mobile-panel" : "v2-campus__panel"}>
      <img
        src={moment.image}
        alt={moment.title}
        className="v2-campus__image"
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
      />
      <div className="v2-campus__wash" aria-hidden="true" />
      <div className="v2-campus__grain" aria-hidden="true" />

      <div className="v2-campus__content">
        <p className="v2-campus__counter" aria-hidden="true">{number(index)}</p>
        <div className="v2-campus__copy">
          <p>Moment {number(index)} · {number(moments.length - 1)}</p>
          <h3>{moment.title}</h3>
          <span>{moment.subtitle}</span>
        </div>
      </div>
    </article>
  );
}

export default function CampusLifeV2() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const context = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)": () => {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="campus-life"
      className="v2-campus"
      aria-labelledby="v2-campus-title"
    >
      <header className="v2-campus__chapter">
        <p><span>Chapter 04</span><i />Campus Life</p>
        <h2 id="v2-campus-title">Life between<em>the lessons.</em></h2>
        <span className="v2-campus__hint">Five moments · Scroll</span>
      </header>

      <div className="v2-campus__desktop" aria-label="Five moments from campus life">
        <div ref={trackRef} className="v2-campus__track">
          {moments.map((moment, index) => (
            <Moment key={moment.title} moment={moment} index={index} />
          ))}
        </div>
      </div>

      <div className="v2-campus__mobile" aria-label="Five moments from campus life">
        {moments.map((moment, index) => (
          <Moment key={moment.title} moment={moment} index={index} mobile />
        ))}
      </div>
    </section>
  );
}
