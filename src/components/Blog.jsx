import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const posts = [
  {
    title: "From React to Django: Building a Full-Stack Clearance System",
    excerpt:
      "Lessons learned during my 4-month internship at Aliyah Software Company — JWT auth, role-based access, and automated approval workflows in production.",
    tag: "Internship",
    date: "Jan 2026",
  },
  {
    title: "Why I Chose Flutter for Cross-Platform Mobile Apps",
    excerpt:
      "A practical comparison of Flutter vs Android Studio (Java/Kotlin) based on real projects I've shipped.",
    tag: "Mobile",
    date: "Dec 2025",
  },
  {
    title: "Cisco CCNA Explained for Software Engineers",
    excerpt:
      "How learning networking (OSI, subnetting, routing) made me a better backend developer — and helped me earn my CNN certificate.",
    tag: "Networking",
    date: "Nov 2025",
  },
  {
    title: "Clean UI/UX Principles for Beginner Developers",
    excerpt:
      "Simple, actionable design rules that turn amateur apps into professional-looking products.",
    tag: "Design",
    date: "Oct 2025",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-4"
      >
        Latest <span className="gradient-text">Insights</span>
      </motion.h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-xl mx-auto">
        Notes from my journey as a software engineer — projects, lessons, and technical deep dives.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 card-hover group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent font-bold">
                {p.tag}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{p.date}</span>
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary dark:group-hover:text-accent transition">
              {p.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {p.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-accent">
              Read more <FaArrowRight className="group-hover:translate-x-1 transition" />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}