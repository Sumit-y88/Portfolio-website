import { useEffect, useState } from "react";
import { BackgroundOrbs } from "./components/common/BackgroundOrbs";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";
import { useGsapAnimations } from "./hooks/useGsapAnimations";
import { useTheme } from "./hooks/useTheme";
import { Home } from "./pages/Home";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useGsapAnimations(isExiting);

  useEffect(() => {
    // 1. Loading Screen Logic
    const timer = setTimeout(() => {
      setIsExiting(true);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    }, 2200);

    // 2. Scroll Reveal Logic (replaces ScrollTrigger)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0", "reveal-on-scroll");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Give React time to render DOM after loading unmounts before observing
    const observeTimer = setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(observeTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen isExiting={isExiting} />}

      <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
        <CustomCursor />
        <ScrollProgress />
        <BackgroundOrbs />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Home />
        <Footer />
      </div>
    </>
  );
};

export default App;
