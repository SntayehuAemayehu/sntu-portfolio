import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaTelegram, FaArrowDown } from "react-icons/fa";
import { profile } from "../data/portfolio";
import LiveStatus from "./LiveStatus";

export default function Hero() {
  return (
    <section
      id="home"
      // FIXED: Increased padding-top (pt-32 md:pt-40) so it doesn't overlap with the Navbar
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden pt-32 md:pt-40 pb-10"
    >
      {/* Background Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/30 rounded-full blur-[120px] animate-float" />

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10 w-full mt-4">
        
        {/* Live Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LiveStatus />
        </motion.div>

        {/* Terminal UI Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-left bg-[#0d1117] rounded-xl border border-slate-700 shadow-2xl overflow-hidden mb-12"
        >
          {/* Terminal Header */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-400 ml-3 font-mono">sntu@ubuntu: ~/portfolio</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base text-slate-300">
            <p className="mb-2">
              <span className="text-emerald-400">sntu@ubuntu</span>:<span className="text-blue-400">~</span>$ whoami
            </p>
            <p className="text-white font-bold text-xl md:text-2xl mb-6">
              {profile.name} <span className="text-slate-500">| {profile.title}</span>
            </p>
            
            <p className="mb-2">
              <span className="text-emerald-400">sntu@ubuntu</span>:<span className="text-blue-400">~</span>$ cat skills.txt
            </p>
            <p className="text-yellow-300 mb-6 leading-relaxed">
              React, Next.js, Django, Python, Flutter, PostgreSQL, Tailwind CSS, Docker, AWS...
            </p>
            
            <p className="mb-2 flex items-center gap-2">
              <span className="text-emerald-400">sntu@ubuntu</span>:<span className="text-blue-400">~</span>$ 
              <span className="w-2.5 h-5 bg-slate-400 animate-pulse inline-block ml-1"></span>
            </p>
          </div>
        </motion.div>

        {/* Dynamic Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-semibold mb-6 h-10"
        >
          <TypeAnimation
            sequence={[
              "Full-Stack Developer",
              2000,
              "Mobile App Developer",
              2000,
              "Software Engineer",
              2000,
              "Network Enthusiast",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="gradient-text"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10"
        >
          {profile.tagline}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-outline">
            Hire Me
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex gap-6 justify-center text-2xl"
        >
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-primary transition hover:scale-125 hover:-translate-y-1">
            <FaGithub />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition hover:scale-125 hover:-translate-y-1">
            <FaLinkedin />
          </a>
          <a href={profile.telegram} target="_blank" rel="noreferrer" className="hover:text-primary transition hover:scale-125 hover:-translate-y-1">
            <FaTelegram />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl animate-bounce text-primary dark:text-accent"
      >
        <FaArrowDown />
      </motion.a>
    </section>
  );
}