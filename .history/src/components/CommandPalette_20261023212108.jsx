import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaTimes } from "react-icons/fa";

const commands = [
  { id: "home", name: "Go to Home", icon: <FaHome />, href: "#home" },
  { id: "about", name: "Read About Me", icon: <FaUser />, href: "#about" },
  { id: "skills", name: "View Skills", icon: <FaCode />, href: "#skills" },
  { id: "projects", name: "See Projects", icon: <FaProjectDiagram />, href: "#projects" },
  { id: "contact", name: "Contact Me", icon: <FaEnvelope />, href: "#contact" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg glass rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <FaSearch className="text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-700 dark:text-white placeholder-slate-400"
                autoFocus
              />
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500">
                <FaTimes />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <p className="text-center text-sm text-slate-500 py-4">No commands found.</p>
              ) : (
                filteredCommands.map((cmd) => (
                  <a
                    key={cmd.id}
                    href={cmd.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <span className="text-primary dark:text-accent">{cmd.icon}</span>
                    <span className="font-medium">{cmd.name}</span>
                  </a>
                ))
              )}
            </div>
            
            {/* Footer hint */}
            <div className="px-4 py-2 bg-slate-100 dark:bg-dark/50 text-xs text-slate-500 text-right border-t border-slate-200 dark:border-slate-800">
              Press <kbd className="font-mono bg-white dark:bg-card px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">Esc</kbd> to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}