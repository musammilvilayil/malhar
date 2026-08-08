import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "sonner";
import HomeV2 from "@/v2/HomeV2";
import AboutV2 from "@/v2/pages/AboutV2";
import AdmissionsV2 from "@/v2/pages/AdmissionsV2";
import DonationV2 from "@/v2/pages/DonationV2";
import ContactV2 from "@/v2/pages/ContactV2";
import NewsV2 from "@/v2/pages/NewsV2";
import MediaV2 from "@/v2/pages/MediaV2";
import VenturesV2 from "@/v2/pages/VenturesV2";
import InstitutionV2 from "@/v2/pages/InstitutionV2";

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrowScreen = window.matchMedia("(max-width: 767px)").matches;
    const saveData = Boolean(navigator.connection?.saveData);

    if (prefersReducedMotion || saveData || (coarsePointer && narrowScreen)) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); ScrollTrigger.refresh(); }, [pathname]);
  return null;
}

function App() {
  useLenis();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/about" element={<AboutV2 />} />
        <Route path="/news" element={<NewsV2 />} />
        <Route path="/media" element={<MediaV2 />} />
        <Route path="/ventures" element={<VenturesV2 />} />
        <Route path="/contact" element={<ContactV2 />} />
        <Route path="/donation" element={<DonationV2 />} />
        <Route path="/admissions" element={<AdmissionsV2 />} />
        <Route path="/institutions/:slug" element={<InstitutionV2 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
