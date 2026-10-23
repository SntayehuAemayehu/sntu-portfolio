import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaTelegram, FaArrowDown } from "react-icons/fa";
import { profile } from "../data/portfolio";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* ... Background blobs ... */}
      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-primary dark:text-accent font-mono mb-4">
          &lt;hello world /&gt;
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-6">
          I'm <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-semibold mb-6 h-10">
          <TypeAnimation sequence={["Full-Stack Developer", 2000, "Mobile App Developer", 2000, "Software Engineer", 2000]} wrapper="span" speed={50} repeat={Infinity} className="gradient-text" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10">
          {profile.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-4 justify-center mb-10">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Hire Me</a>
        </motion.div>
        {/* ... socials ... */}
      </div>
    </section>
  );
}