import { useEffect, useRef, useState } from "react";
import { BackgroundOrbs } from "./components/common/BackgroundOrbs";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";
import { useGsapAnimations } from "./hooks/useGsapAnimations";
import { useLocomotiveScroll } from "./hooks/useLocomotiveScroll";
import { useTheme } from "./hooks/useTheme";
import { Home } from "./pages/Home";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const scrollContainerRef = useRef(null);

  useLocomotiveScroll(scrollContainerRef, !loading);

  useGsapAnimations(!loading);

  useEffect(() => {
    // Loading Screen Logic
    const timer = setTimeout(() => {
      setIsExiting(true);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Update Locomotive Scroll when layout-affecting state changes.
  useEffect(() => {
    const locoScroll = window.__locomotiveScroll;
    if (locoScroll) {
      setTimeout(() => locoScroll.update(), 400);
    }
  }, [loading, theme]);

  return (
    <div className="bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      {loading && <LoadingScreen isExiting={isExiting} />}

      {/* Fixed elements must be outside Locomotive scroll container */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main
        ref={scrollContainerRef}
        data-scroll-container
        className="relative min-h-screen w-full"
      >
        <BackgroundOrbs />
        <Home />
        <div data-scroll-section>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;
