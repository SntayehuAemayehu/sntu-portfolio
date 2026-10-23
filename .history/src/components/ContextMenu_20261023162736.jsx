import { useState, useEffect } from "react";
import { FaCopy, FaGithub, FaDownload, FaEnvelope } from "react-icons/fa";
import { profile } from "../data/portfolio";

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setPosition({ x: e.pageX, y: e.pageY });
      setVisible(true);
    };

    const handleClick = () => setVisible(false);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className="fixed z-[9999] glass rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 w-56 overflow-hidden animate-in fade-in zoom-in duration-200"
      style={{ top: position.y, left: position.x }}
    >
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 mb-1">
        <p className="text-xs font-bold text-slate-500">Sntu's Portfolio Menu</p>
      </div>

      <button 
        onClick={() => { navigator.clipboard.writeText(profile.email); alert("Email Copied!"); }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition flex items-center gap-3"
      >
        <FaCopy /> Copy Email
      </button>

      <a 
        href={profile.github} target="_blank" rel="noreferrer"
        className="w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition flex items-center gap-3"
      >
        <FaGithub /> View GitHub
      </a>

      <a 
        href={profile.resume} download
        className="w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition flex items-center gap-3"
      >
        <FaDownload /> Download CV
      </a>

      <a 
        href="#contact"
        className="w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition flex items-center gap-3"
      >
        <FaEnvelope /> Contact Me
      </a>
    </div>
  );
}