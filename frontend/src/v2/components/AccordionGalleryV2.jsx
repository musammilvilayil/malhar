import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SWIPE_THRESHOLD = 42;

export default function AccordionGalleryV2({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);
  const suppressClick = useRef(false);

  const moveSlide = (direction) => {
    setActiveIndex((current) => {
      const next = current + direction;
      return (next + items.length) % items.length;
    });
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    suppressClick.current = false;
  };

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    suppressClick.current = true;
    moveSlide(deltaX < 0 ? 1 : -1);

    window.setTimeout(() => {
      suppressClick.current = false;
    }, 300);
  };

  return (
    <>
      <div
        className="v2-accordion"
        role="group"
        aria-label="Campus life gallery"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={item.title}
              type="button"
              className={`v2-accordion__panel${active ? " is-active" : ""}`}
              onClick={() => {
                if (!suppressClick.current) setActiveIndex(index);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              aria-pressed={active}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="v2-accordion__wash" aria-hidden="true" />

              <span className="v2-accordion__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="v2-accordion__caption">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
            </button>
          );
        })}

        <span className="v2-accordion__status" aria-live="polite">
          {items[activeIndex].title}, {activeIndex + 1} of {items.length}
        </span>
      </div>

      <div className="v2-accordion__mobile-controls" aria-label="Campus gallery controls">
        <button
          type="button"
          className="v2-accordion__nav-button"
          onClick={() => moveSlide(-1)}
          aria-label="Previous campus image"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="v2-accordion__dots" role="group" aria-label="Choose campus image">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`v2-accordion__dot${index === activeIndex ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="v2-accordion__nav-button"
          onClick={() => moveSlide(1)}
          aria-label="Next campus image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
