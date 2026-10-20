import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

const categories = [
  { key: "languages", title: "Languages", type: "bar" },
  { key: "frontend", title: "Frontend" },
  { key: "backend", title: "Backend" },
  { key: "mobile", title: "Mobile" },
  { key: "databases", title: "Databases" },
  { key: "devops", title: "DevOps & Tools" },
  { key: "other", title: "Other Skills" },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-16"
      >
        My <span className="gradient-text">Skills</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {skills.languages.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex justify-between mb-2 text-sm font-semibold">
              <span>{s.name}</span>
              <span className="text-primary dark:text-accent">{s.level}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-card rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.filter((c) => c.type !== "bar").map((cat) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 card-hover"
          >
            <h3 className="text-lg font-bold mb-4 gradient-text">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {skills[cat.key].map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}