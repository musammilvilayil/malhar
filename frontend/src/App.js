import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "sonner";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import AdaptiveAtmosphere from "@/components/site/AdaptiveAtmosphere";
import SiteTour from "@/components/site/SiteTour";
import ClickSpark from "@/components/reactbits/ClickSpark";
import FadeContent from "@/components/reactbits/FadeContent";
import HomeV2 from "@/v2/HomeV2";
import AboutV2 from "@/v2/pages/AboutV2";
import AdmissionsV2 from "@/v2/pages/AdmissionsV2";
import DonationV2 from "@/v2/pages/DonationV2";
import ContactPage from "@/pages/Contact";
import {
  InstitutionsPage, VenturesPage, MediaPage, GalleryPage, NewsPage,
  InstructorPage, InstitutionPage,
} from "@/pages/Pages";
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

const LegacySite = ({ children }) => (
  <ClickSpark sparkColor="#D4AF37" sparkCount={6} sparkRadius={18} sparkSize={8}>
    <AdaptiveAtmosphere />
    <Nav />
    <FadeContent blur duration={0.55} threshold={0.02}>
      <main className="relative">{children}</main>
    </FadeContent>
    <SiteTour />
    <Footer />
  </ClickSpark>
);

function App() {
  useLenis();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/about" element={<AboutV2 />} />
        <Route path="/about-us" element={<AboutV2 />} />
        <Route path="/our-institutions" element={<LegacySite><InstitutionsPage /></LegacySite>} />
        <Route path="/our-ventures" element={<LegacySite><VenturesPage /></LegacySite>} />
        <Route path="/media" element={<LegacySite><MediaPage /></LegacySite>} />
        <Route path="/gallery" element={<LegacySite><GalleryPage /></LegacySite>} />
        <Route path="/news" element={<LegacySite><NewsPage /></LegacySite>} />
        <Route path="/contact" element={<LegacySite><ContactPage /></LegacySite>} />
        <Route path="/donate-us" element={<DonationV2 />} />
        <Route path="/donation" element={<DonationV2 />} />
        <Route path="/admission" element={<AdmissionsV2 />} />
        <Route path="/admissions" element={<AdmissionsV2 />} />
        <Route path="/institution/:slug" element={<LegacySite><InstitutionPage /></LegacySite>} />
        <Route path="/instructor/:slug" element={<LegacySite><InstructorPage /></LegacySite>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
