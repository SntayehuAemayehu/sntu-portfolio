import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import FloatingContact from "./components/FloatingContact";
import RecruiterMode from "./components/RecruiterMode";
import TechMarquee from "./components/TechMarquee"; // Added this
import <AIAssistant 
export default function App() {
  const [dark, setDark] = useState(true);
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  return (
    <div className="app-wrapper noise-overlay">
      <ScrollProgress />
      <Cursor />
      {/* PASSING setRecruiterMode TO NAVBAR HERE */}
      <Navbar dark={dark} setDark={setDark} setRecruiterMode={setRecruiterMode} />
      
      <main>
        <Hero />
        <TechMarquee /> {/* Added Tech Marquee here */}
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Education />
        <Certificates />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
      <BackToTop />
      <FloatingContact />
      <AIAssistant />
      
      {/* RENDERING THE RECRUITER MODAL HERE */}
      <RecruiterMode isOpen={recruiterMode} onClose={() => setRecruiterMode(false)} />
    </div>
  );
}