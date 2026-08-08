import { useState, useEffect, useRef } from "react";

// Adapted from DavidHDev/react-bits Magnet for the Malhar design system.
const Magnet = ({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 3,
  activeTransition = "transform 0.22s ease-out",
  inactiveTransition = "transform 0.45s cubic-bezier(.22,1,.36,1)",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled || window.matchMedia("(pointer: coarse)").matches) {
      setPosition({ x: 0, y: 0 });
      return undefined;
    }

    const handleMouseMove = (e) => {
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        setPosition({
          x: (e.clientX - centerX) / magnetStrength,
          y: (e.clientY - centerY) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, disabled, magnetStrength]);

  return (
    <div ref={magnetRef} className={wrapperClassName} style={{ position: "relative", display: "inline-block" }} {...props}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
