import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const t = testimonials[index];

  return (
    <section id="testimonials" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-16"
      >
        What People <span className="gradient-text">Say</span>
      </motion.h2>

      <div className="max-w-3xl mx-auto relative">
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <FaQuoteLeft className="absolute top-6 left-6 text-5xl text-primary/10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <FaChevronLeft />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-gradient-to-r from-primary to-accent" : "w-2 bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}