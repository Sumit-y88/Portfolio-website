import { useEffect, useState, useRef } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clicks, setClicks] = useState([]);
  const requestRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("has-custom-cursor");
    setIsVisible(true);

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(updatePosition);
    };
    
    requestRef.current = requestAnimationFrame(updatePosition);

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "select" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("clickable");

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);

      // Add ripple effect
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 500);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] text-slate-900 drop-shadow-md will-change-transform dark:text-slate-100"
        style={{
          transform: `translate3d(-100px, -100px, 0)`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className={`origin-top-left transition-transform duration-150 ease-out ${
            isClicking ? "scale-75" : isHovering ? "scale-125" : "scale-100"
          }`}
        >
          <path
            fill="currentColor"
            d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="pointer-events-none fixed z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-slate-900/40 dark:border-slate-100/40"
          style={{
            left: click.x,
            top: click.y,
            animationDuration: "0.5s",
          }}
        />
      ))}
    </>
  );
};
