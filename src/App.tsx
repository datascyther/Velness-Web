import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { Features } from "./components/Features";
import { OpenSource } from "./components/OpenSource";
import { Engineering } from "./components/Engineering";
import { Roadmap } from "./components/Roadmap";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { WaitlistPage } from "./pages/WaitlistPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { ContributePage } from "./pages/ContributePage";
import { useTheme } from "./hooks/useTheme";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
    >
      <div className="h-full w-full bg-gradient-to-r from-[var(--color-amber)] via-[var(--color-iris)] to-[var(--color-cyan)]" />
    </motion.div>
  );
}

function Cursor() {
  const { resolved } = useTheme();
  
  useEffect(() => {
    const dot = document.getElementById("glow-cursor");
    if (!dot) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate3d(${e.clientX - 200}px, ${
          e.clientY - 200
        }px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const glowColor = resolved === "dark" 
    ? "rgba(139,123,255,0.18)" 
    : "rgba(139,123,255,0.12)";

  return (
    <div
      id="glow-cursor"
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-[400px] w-[400px] rounded-full opacity-40 transition-colors duration-500 md:block"
      style={{
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
        transition: "transform 0.18s cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}

function ThemeInitializer() {
  const { resolved } = useTheme();
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
  }, [resolved]);
  
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen grain">
        <ThemeInitializer />
        <div className="aurora">
          <div className="aurora-blob" />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Cursor />
                <ScrollProgress />
                <div className="relative z-10">
                  <Nav />
                  <main>
                    <Hero />
                    <Philosophy />
                    <Features />
                    <OpenSource />
                    <Engineering />
                    <Roadmap />
                    <FAQ />
                    <FinalCTA />
                  </main>
                  <Footer />
                </div>
              </>
            }
          />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contribute" element={<ContributePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
