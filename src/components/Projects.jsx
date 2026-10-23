import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCopy, FaCheck } from "react-icons/fa";
import { projects } from "../data/projects";

const filters = ["All", "Web", "Mobile", "Networking", "Desktop"];

function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative w-full h-full"
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="projects" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-8"
      >
        My <span className="gradient-text">Projects</span>
      </motion.h2>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === f
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "glass hover:bg-primary/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p, i) => (
          <TiltCard key={p.id}>
            <motion.article
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden group h-full flex flex-col relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/30 transition-all duration-500 z-0" />
              
              <div className="h-40 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-5xl font-black gradient-text relative z-10">
                {p.category}
              </div>
              
              <div className="p-6 relative z-10 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  {p.featured && (
                    <span className="text-[10px] px-2 py-1 bg-accent/20 text-accent rounded-full font-bold">
                      FEATURED
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 bg-primary/10 text-primary dark:text-accent rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto items-center">
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition">
                    <FaGithub /> Code
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  
                  {/* Copy Button */}
                  <button 
                    onClick={() => handleCopy(p.github, p.id)}
                    className="ml-auto text-slate-400 hover:text-accent transition text-sm flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-2 rounded-full"
                    title="Copy GitHub Link"
                  >
                    {copiedId === p.id ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
                  </button>
                </div>
              </div>
            </motion.article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}