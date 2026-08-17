import { useState, useRef, useEffect } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#0123456789";

const TextScramble = ({ text = "", className = "", triggerOnHover = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const frameRef = useRef(null);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let frame = 0;
    const totalFrames = text.length * 3;
    const output = text.split("");

    const update = () => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = output
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < progress * text.length) {
            return text[i];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        isScrambling.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    setDisplayText(text);
    return () => cancelAnimationFrame(frameRef.current);
  }, [text]);

  return (
    <span
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={`font-mono transition-colors duration-200 cursor-[inherit] ${className}`}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;
