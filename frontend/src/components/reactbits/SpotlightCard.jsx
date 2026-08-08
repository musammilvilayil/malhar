import { useRef, useState } from "react";

// Adapted from DavidHDev/react-bits SpotlightCard.
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(212, 175, 55, 0.18)" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(0.72); }}
      onBlur={() => { setIsFocused(false); setOpacity(0); }}
      onMouseEnter={() => setOpacity(0.72)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 68%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
