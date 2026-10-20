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

export default function App() {
  const [dark, setDark] = useState(true);

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
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
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
    </div>
  );
}