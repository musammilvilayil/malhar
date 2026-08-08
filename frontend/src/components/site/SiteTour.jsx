import { useCallback, useEffect, useState } from "react";
import { Compass } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const candidates = [
  {
    element: "header",
    popover: {
      title: "Explore Malhar",
      description: "Use the main navigation to move between Malhar's story, institutions, admissions, media and community pages.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "main > section:first-child",
    popover: {
      title: "A living educational story",
      description: "The homepage is designed as a guided journey rather than a conventional grid of cards.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#origin-story",
    popover: {
      title: "Where the story begins",
      description: "Discover Malhar's foundation, purpose and the vision associated with Posoat Thangal.",
      side: "top",
      align: "center",
    },
  },
  {
    element: 'a[href="/our-institutions"]',
    popover: {
      title: "Institutions",
      description: "Explore Malhar's educational institutions and their individual learning focus.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: 'a[href="/admission"]',
    popover: {
      title: "Admissions",
      description: "Admission information and programme pathways are kept within easy reach throughout the experience.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: 'a[href="/donate-us"]',
    popover: {
      title: "Support the mission",
      description: "The donation page provides a direct path for people who want to support Malhar's educational work.",
      side: "bottom",
      align: "center",
    },
  },
];

export default function SiteTour() {
  const [canAnimate, setCanAnimate] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanAnimate(!reduced);
  }, []);

  const startTour = useCallback(() => {
    const steps = candidates.filter(({ element }) => document.querySelector(element));
    if (!steps.length) return;

    const tour = driver({
      showProgress: true,
      allowClose: true,
      animate: canAnimate,
      smoothScroll: canAnimate,
      stagePadding: 10,
      stageRadius: 18,
      overlayOpacity: 0.68,
      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Explore",
      progressText: "{{current}} of {{total}}",
      popoverClass: "malhar-driver-popover",
      steps,
    });

    tour.drive();
  }, [canAnimate]);

  return (
    <button
      type="button"
      onClick={startTour}
      className="fixed bottom-5 left-4 z-[70] hidden sm:inline-flex items-center gap-2 rounded-full border border-gold/35 bg-emerald/85 px-4 py-2.5 text-xs font-semibold tracking-wide text-cream shadow-[0_14px_45px_rgba(0,0,0,.2)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-gold/70 hover:bg-emerald md:bottom-6 md:left-6"
      aria-label="Start a guided tour of the Malhar website"
    >
      <Compass size={15} className="text-gold" />
      Site guide
    </button>
  );
}
