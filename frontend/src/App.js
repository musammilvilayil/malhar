import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "sonner";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const Home = lazy(() => import("@/pages/Home"));
const Admin = lazy(() => import("@/pages/Admin"));
const Pages = lazy(() => import("@/pages/Pages"));

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-[60vh] grid place-items-center" role="status" aria-live="polite">
      <div className="text-center">
        <div className="h-10 w-10 mx-auto rounded-full border-2 border-emerald/20 border-t-emerald animate-spin" />
        <p className="mt-4 text-charcoal/70">Loading page…</p>
      </div>
    </div>
  );
}

const Site = ({ children }) => (
  <>
    <Nav />
    <main id="main-content" className="relative">{children}</main>
    <Footer />
  </>
);

function PageRoutes() {
  return (
    <Pages />
  );
}

function NotFound() {
  return (
    <Site>
      <section className="min-h-[70vh] grid place-items-center px-6 text-center">
        <div>
          <p className="text-gold-brass font-semibold tracking-[0.2em] uppercase">404</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-serif text-emerald">Page not found</h1>
          <p className="mt-4 text-charcoal/70 max-w-xl">The page you are looking for may have moved or no longer exists.</p>
          <Link to="/" className="inline-flex mt-8 px-6 py-3 bg-emerald text-cream hover:bg-emerald-light transition-colors">Back to home</Link>
        </div>
      </section>
    </Site>
  );
}

function App() {
  useLenis();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Site><Home /></Site>} />
          <Route path="/about-us" element={<Site><PageRoutes page="about" /></Site>} />
          <Route path="/our-institutions" element={<Site><PageRoutes page="institutions" /></Site>} />
          <Route path="/our-ventures" element={<Site><PageRoutes page="ventures" /></Site>} />
          <Route path="/media" element={<Site><PageRoutes page="media" /></Site>} />
          <Route path="/gallery" element={<Site><PageRoutes page="gallery" /></Site>} />
          <Route path="/news" element={<Site><PageRoutes page="news" /></Site>} />
          <Route path="/contact" element={<Site><PageRoutes page="contact" /></Site>} />
          <Route path="/donate-us" element={<Site><PageRoutes page="donate" /></Site>} />
          <Route path="/admission" element={<Site><PageRoutes page="admission" /></Site>} />
          <Route path="/institution/:slug" element={<Site><PageRoutes page="institution" /></Site>} />
          <Route path="/instructor/:slug" element={<Site><PageRoutes page="instructor" /></Site>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
