import AccordionGalleryV2 from "./AccordionGalleryV2";
import "./CampusLifeV2.css";

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

export default function CampusLifeV2() {
  return (
    <section id="campus-life" className="v2-campus" aria-labelledby="v2-campus-title">
      <div className="v2-campus__grain" aria-hidden="true" />

      <header className="v2-campus__header">
        <p className="v2-campus__eyebrow"><span>Campus Life</span><i /></p>

        <div className="v2-campus__heading-grid">
          <h2 id="v2-campus-title">
            Life between
            <em>the lessons.</em>
          </h2>

          <div className="v2-campus__intro-copy">
            <span>Everyday Malhar</span>
            <p>
              A visual journal of the spaces, gatherings and everyday moments
              that shape life at Malhar.
            </p>
          </div>
        </div>
      </header>

      <div className="v2-campus__gallery-shell">
        <AccordionGalleryV2 items={moments} />

        <footer className="v2-campus__footer">
          <span>Swipe or tap a panel to explore</span>
          <span>Study · Friendship · Community</span>
        </footer>
      </div>
    </section>
  );
}
