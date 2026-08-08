import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "sonner";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import Home from "@/pages/HomeExperience";
import DonatePage from "@/pages/Donate";
import ContactPage from "@/pages/Contact";
import {
  AboutPage, InstitutionsPage, VenturesPage, MediaPage, GalleryPage, NewsPage,
  AdmissionPage, InstructorPage, InstitutionPage,
} from "@/pages/Pages";
import Admin from "@/pages/Admin";

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
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

const Site = ({ children }) => (
  <>
    <Nav />
    <main className="relative">{children}</main>
    <Footer />
  </>
);

function App() {
  useLenis();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Site><Home /></Site>} />
        <Route path="/about-us" element={<Site><AboutPage /></Site>} />
        <Route path="/our-institutions" element={<Site><InstitutionsPage /></Site>} />
        <Route path="/our-ventures" element={<Site><VenturesPage /></Site>} />
        <Route path="/media" element={<Site><MediaPage /></Site>} />
        <Route path="/gallery" element={<Site><GalleryPage /></Site>} />
        <Route path="/news" element={<Site><NewsPage /></Site>} />
        <Route path="/contact" element={<Site><ContactPage /></Site>} />
        <Route path="/donate-us" element={<Site><DonatePage /></Site>} />
        <Route path="/admission" element={<Site><AdmissionPage /></Site>} />
        <Route path="/institution/:slug" element={<Site><InstitutionPage /></Site>} />
        <Route path="/instructor/:slug" element={<Site><InstructorPage /></Site>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
