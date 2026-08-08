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
import InstitutionV2 from "@/v2/pages/InstitutionV2";
import Admin from "@/pages/Admin";

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
        <Route path="/about-us" element={<Navigate to="/about" replace />} />
        <Route path="/our-institutions" element={<Navigate to="/admissions" replace />} />
        <Route path="/our-ventures" element={<Navigate to="/" replace />} />
        <Route path="/media" element={<Navigate to="/" replace />} />
        <Route path="/gallery" element={<Navigate to="/" replace />} />
        <Route path="/news" element={<NewsV2 />} />
        <Route path="/contact" element={<ContactV2 />} />
        <Route path="/donate-us" element={<Navigate to="/donation" replace />} />
        <Route path="/donation" element={<DonationV2 />} />
        <Route path="/admission" element={<Navigate to="/admissions" replace />} />
        <Route path="/admissions" element={<AdmissionsV2 />} />
        <Route path="/institutions/:slug" element={<InstitutionV2 />} />
        <Route path="/institution/:slug" element={<InstitutionV2 />} />
        <Route path="/instructor/:slug" element={<Navigate to="/about" replace />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
