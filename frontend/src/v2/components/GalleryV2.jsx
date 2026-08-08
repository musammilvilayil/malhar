import { motion, useReducedMotion } from "framer-motion";
import { GALLERY_IMAGES } from "../../data";
import "./GalleryV2.css";

export default function GalleryV2() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="visual-journal" className="v2-gallery" aria-labelledby="v2-gallery-title">
      <h2 id="v2-gallery-title" className="v2-gallery__sr-only">Visual journal</h2>

      <div className="v2-gallery__masonry">
        {GALLERY_IMAGES.map((item, index) => (
          <motion.figure
            key={item.src}
            className="v2-gallery__item"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7, delay: Math.min(index * 0.035, 0.2), ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                decoding="async"
              />
              <span aria-hidden="true" />
            </div>
            <figcaption>{item.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
