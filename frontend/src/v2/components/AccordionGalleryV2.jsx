import { useState } from "react";

export default function AccordionGalleryV2({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="v2-accordion" role="group" aria-label="Campus life gallery">
      {items.map((item, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={item.title}
            type="button"
            className={`v2-accordion__panel${active ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
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
    </div>
  );
}
