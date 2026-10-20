import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import DevTerminal from "./DevTerminal"; // Imported the DevTerminal

export default function About() {
  return (
    <section id="about" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-16"
      >
        About <span className="gradient-text">Me</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="w-full aspect-square rounded-3xl overflow-hidden border-2 border-primary/30 relative">
            <img 
              src="/profile.jpg" 
              alt="Sntayehu Alemayehu" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-xl">
            <p className="text-sm text-slate-500 dark:text-slate-400">Internship</p>
            <p className="text-2xl font-black gradient-text">4 Months</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">
            Software Engineering Graduate & Full-Stack Developer
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {profile.summary}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              ["Name", profile.name],
              ["Age", `${profile.age} Years`],
              ["Location", "Ethiopia"],
              ["Email", profile.email],
              ["Phone", profile.phone],
              ["Status", "Available for work"],
            ].map(([k, v]) => (
              <div key={k} className="text-sm">
                <span className="font-bold">{k}: </span>
                <span className="text-slate-600 dark:text-slate-400 break-all">{v}</span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="font-bold mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((l) => (
                <span
                  key={l.name}
                  className="px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent text-sm font-medium"
                >
                  {l.name} — {l.level}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary inline-block">
              Download CV
            </a>
            <a href="#contact" className="btn-outline inline-block">Contact Me</a>
          </div>
        </motion.div>
      </div>

      {/* NEW: Developer Terminal Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">Interactive <span className="gradient-text">Developer Console</span></h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Type <code className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-primary dark:text-accent">help</code> to see available commands and learn more about my skills.
          </p>
        </div>
        <DevTerminal />
      </motion.div>
    </section>
  );
}