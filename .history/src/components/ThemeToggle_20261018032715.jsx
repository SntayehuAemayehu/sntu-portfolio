import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className="relative w-14 h-8 rounded-full bg-slate-300 dark:bg-slate-700 transition-colors duration-300
                 flex items-center px-1"
    >
      <span
        className={`absolute w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent
                    flex items-center justify-center text-white text-xs shadow-lg
                    transition-transform duration-300 ${dark ? "translate-x-6" : "translate-x-0"}`}
      >
        {dark ? <FaMoon /> : <FaSun />}
      </span>
    </button>
  );
}