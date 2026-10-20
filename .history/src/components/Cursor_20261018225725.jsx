import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a button or link
      const target = e.target;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed z-[9999] hidden md:flex items-center justify-center
                 rounded-full transition-all duration-150 ease-out mix-blend-difference
                 ${isHovering ? "w-12 h-12 bg-accent/80" : "w-6 h-6 bg-white opacity-50"}`}
      style={{ 
        left: pos.x - (isHovering ? 24 : 12), 
        top: pos.y - (isHovering ? 24 : 12) 
      }}
    >
      {isHovering && <span className="text-dark font-black text-xs">CLICK</span>}
    </div>
  );
}