import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "react-icons/fa";
import { certificates } from "../data/certificates";

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState(null);

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
      
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {certificates.map((c, i) => {
          const Icon = Icons[c.icon] || Icons.FaAward;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover flex flex-col gap-5 cursor-pointer group"
              onClick={() => c.image && setSelectedImage(c.image)}
            >
              {/* Certificate Image (if available) */}
              {c.image ? (
                <div className="w-full h-48 rounded-xl overflow-hidden relative">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white font-bold bg-primary/80 px-4 py-2 rounded-full">Click to Zoom</span>
                  </div>
                </div>
              ) : (
                <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-6xl text-white`}>
                  <Icon />
                </div>
              )}
              
              <div>
                <h3 className="font-bold text-lg leading-tight mb-1">{c.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{c.issuer}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULL SCREEN ZOOM MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={selectedImage}
              alt="Certificate Zoom"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
            <button 
              className="absolute top-6 right-6 text-white text-3xl hover:text-primary transition"
              onClick={() => setSelectedImage(null)}
            >
              <Icons.FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}