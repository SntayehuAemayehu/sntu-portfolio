import { motion } from "framer-motion";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-16"
      >
        My <span className="gradient-text">Experience</span>
      </motion.h2>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />

        {experience.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative mb-10 md:w-1/2 ${
              i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
            } pl-12 md:pl-0`}
          >
            <div
              className={`absolute top-4 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg
              ${i % 2 === 0 ? "left-2 md:-right-2" : "left-2 md:-left-2"}`}
            />
            <div className="glass rounded-2xl p-6 card-hover">
              <span className="text-xs font-mono text-primary dark:text-accent">{e.period}</span>
              <h3 className="text-lg font-bold mt-1">{e.role}</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{e.company}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{e.description}</p>
              {e.tags && (
                <div className="flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}