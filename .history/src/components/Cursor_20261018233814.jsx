import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden md:block w-6 h-6 rounded-full
                 bg-gradient-to-r from-primary to-accent opacity-40 blur-md"
      style={{ left: pos.x - 12, top: pos.y - 12 }}
    />
  );
}