import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { stats } from "../data/portfolio";

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.floor((value * frame) / total));
      if (frame >= total) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black gradient-text">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="glass rounded-2xl p-6 text-center card-hover"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}