import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { education } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-16"
      >
        My <span className="gradient-text">Education</span>
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {education.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 card-hover flex gap-6"
          >
            <div className="text-4xl text-primary dark:text-accent shrink-0">
              <FaGraduationCap />
            </div>
            <div>
              <span className="text-xs font-mono text-primary dark:text-accent">{e.period}</span>
              <h3 className="text-xl font-bold mt-1">{e.degree}</h3>
              <p className="font-semibold text-slate-500 dark:text-slate-400 mb-2">{e.school}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{e.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}