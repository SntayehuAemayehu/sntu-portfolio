import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaTelegram, FaArrowDown } from "react-icons/fa";
import { profile } from "../data/portfolio";
import LiveStatus from "./LiveStatus";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center grid-bg overflow-hidden pt-32 pb-16"
    >
      {/* Background Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/30 rounded-full blur-[120px] animate-float" />

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10 w-full">
        
        {/* Live Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4"
        >
          <LiveStatus />
        </motion.div>

        {/* REMOVED <hello world /> here */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black mb-6 mt-10" // Added mt-10 to give it space since the text was removed
        >
          I'm <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        {/* Dynamic Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-3xl font-semibold mb-6 h-10"
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
    </section>
  );
}