import { useEffect, useState } from "react";

const texts = [
  "Computer Engineering Student",
  "Web Developer",
  "DSA Enthusiast",
];

const TypeEffect = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    if (!currentText) return;

    let timeout;

    if (!isDeleting && charIndex < currentText.length) {
      // Typing
      timeout = setTimeout(() => {
        setText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else {
      // Pause before switching mode
      timeout = setTimeout(() => {
        if (!isDeleting) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <h2 className="my-8 text-3xl md:text-4xl text-gray-300">
      I'm a{" "}
      <span className="text-indigo-500">{text}</span>
      <span className="animate-pulse">|</span>
    </h2>
  );
};

export default TypeEffect;
