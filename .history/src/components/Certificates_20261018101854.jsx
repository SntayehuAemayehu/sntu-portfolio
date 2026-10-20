import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import { certificates } from "../data/certificates";

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-4"
      >
        My <span className="gradient-text">Certificates</span>
      </motion.h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-xl mx-auto">
        Verified certifications from Cisco, Mekdela Amba University, and my internship at Aliyah Software Company.
      </p>

{/* Inside the map function */}
<div className="glass rounded-2xl overflow-hidden card-hover flex flex-col group">
  {c.image && (
    <div className="h-48 overflow-hidden relative">
      <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <a href={c.image} target="_blank" rel="noreferrer" className="btn-primary py-2 px-4 text-sm">View Full</a>
      </div>
    </div>
  )}
  <div className="p-6">
    {/* Rest of the certificate content */}
  </div>
</div>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <h3 className="font-bold text-lg leading-tight">{c.title}</h3>
                  <span className="text-xs font-mono text-primary dark:text-accent shrink-0">{c.year}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{c.issuer}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}