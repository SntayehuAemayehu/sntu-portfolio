import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const links = [
  "Home", "About", "Skills", "Projects", "Services",
  "Experience", "Certificates", "Testimonials", "Contact",
];

export default function Navbar({ dark, setDark, setRecruiterMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper to trigger the Command Palette (Ctrl + K)
  const triggerSearch = () => {
    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
    window.dispatchEvent(event);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* Logo with Small Photo */}
        <a href="#home" className="flex items-center gap-2 group">
          <img 
            src="/profile.jpg" 
            alt="Sntu" 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover object-top border-2 border-primary group-hover:scale-110 transition-transform duration-300" 
          />
          <span className="text-2xl font-black gradient-text hidden sm:block">SNTU.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="font-medium text-sm hover:text-primary dark:hover:text-accent transition-colors relative group"
              >
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Command Palette Search Button */}
          <button 
            onClick={triggerSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <FaSearch />
            <span className="text-xs font-mono">Ctrl K</span>
          </button>

          <ThemeToggle dark={dark} setDark={setDark} />
          
          <button 
            onClick={() => setRecruiterMode(true)}
            className="hidden md:block px-4 py-2 text-sm font-bold bg-primary/10 text-primary dark:text-accent rounded-full hover:bg-primary hover:text-white transition"
          >
            Recruiter Mode
          </button> 

          <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <ul className="lg:hidden glass mt-3 mx-4 rounded-xl p-4 flex flex-col gap-3">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="font-medium">
                {l}
              </a>
            </li>
          ))}
          <li>
            <button 
              onClick={() => { setOpen(false); setRecruiterMode(true); }}
              className="font-bold text-primary dark:text-accent w-full text-left"
            >
              Recruiter Mode
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}