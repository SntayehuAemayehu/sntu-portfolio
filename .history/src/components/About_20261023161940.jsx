import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import SystemStatus from "./SystemStatus";
import { FaEye, FaDownload, FaEnvelope } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-6"
      >
        About <span className="gradient-text">Me</span>
      </motion.h2>

      <SystemStatus />

      <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
        
        {/* --- NEW DYNAMIC PHOTO SECTION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          {/* Outer Glowing Ring */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-primary via-purple-500 to-accent animate-glow">
            
            {/* Inner Image Container with padding */}
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-dark bg-slate-200 dark:bg-card">
              <img 
                src="/profile.jpg" 
                alt="Sntayehu Alemayehu" 
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-4 right-4 md:bottom-10 md:right-10 glass rounded-2xl p-3 md:p-4 shadow-2xl backdrop-blur-md"
          >
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Internship</p>
            <p className="text-xl md:text-2xl font-black gradient-text">4 Months</p>
          </motion.div>
        </motion.div>
        {/* --- END PHOTO SECTION --- */}

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

          <div className="mb-8">
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

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3">
            <a 
              href={profile.resume} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline flex items-center gap-2 text-sm md:text-base px-6 py-2.5"
            >
              <FaEye /> View CV
            </a>

            <a 
              href={profile.resume} 
              download="Sntayehu_Alemayehu_CV.pdf" 
              className="px-6 py-2.5 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-dark transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
            >
              <FaDownload /> Download CV
            </a>

            <a 
              href="#contact" 
              className="px-6 py-2.5 rounded-full bg-primary/10 text-primary dark:text-accent font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
            >
              <FaEnvelope /> Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}