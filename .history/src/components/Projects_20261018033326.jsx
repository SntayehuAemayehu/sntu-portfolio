import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/portfolio";

const filters = ["All", "Web", "Mobile", "Networking"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

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
          <motion.article
            key={p.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl overflow-hidden card-hover group"
          >
            <div className="h-40 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-5xl font-black gradient-text">
              {p.category}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{p.title}</h3>
                {p.featured && (
                  <span className="text-[10px] px-2 py-1 bg-accent/20 text-accent rounded-full font-bold">
                    FEATURED
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 bg-primary/10 text-primary dark:text-accent rounded">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm hover:text-primary transition">
                  <FaGithub /> Code
                </a>
                <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm hover:text-primary transition">
                  <FaExternalLinkAlt /> Demo
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}