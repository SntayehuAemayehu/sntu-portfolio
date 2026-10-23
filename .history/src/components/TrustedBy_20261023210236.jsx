
import { motion } from "framer-motion";

const techs = [
  "React", "Django", "Python", "Node.js", "Flutter", 
  "PostgreSQL", "SQLite", "C++", "Tailwind CSS", "Cisco"
];

export default function TrustedBy() {
  return (
    // Changed py-12 to pt-6 pb-12 to reduce the top space
    <div className="pt-6 pb-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-dark/30 overflow-hidden">
      <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
        Technologies I Work With
      </p>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 px-8"
        >
          {[...techs, ...techs].map((tech, i) => (
            <span key={i} className="text-2xl font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}