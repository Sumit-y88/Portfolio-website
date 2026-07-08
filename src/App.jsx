import { useEffect, useRef, useState } from "react";
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
  const scrollContainerRef = useRef(null);

  useGsapAnimations(!loading);

  useEffect(() => {
    // Loading Screen Logic
    const timer = setTimeout(() => {
      setIsExiting(true);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white overflow-x-hidden w-full max-w-full">
      {loading && <LoadingScreen isExiting={isExiting} />}

      <CustomCursor />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <BackgroundOrbs />

      <main
        ref={scrollContainerRef}
        className="relative min-h-screen w-full"
      >
        <Home />
        <Footer />
      </main>
    </div>
  );
};

export default App;
