import { motion } from "framer-motion";
import { profile } from "../data/portfolio";

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

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center relative overflow-hidden">
            <div className="text-[120px] font-black gradient-text">SNTU</div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.3),transparent_60%)]" />
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
            <a href={profile.SntayehuAlemayehu} className="btn-primary inline-block">Download CV</a>
            <a href="#contact" className="btn-outline inline-block">Contact Me</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}