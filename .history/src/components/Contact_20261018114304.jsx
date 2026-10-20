import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { profile } from "../data/portfolio";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData();
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // 👈 PASTE YOUR KEY HERE
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" }); // Clear form
        setTimeout(() => setStatus("idle"), 5000); // Reset button after 5s
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-4"
      >
        Get In <span className="gradient-text">Touch</span>
      </motion.h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-xl mx-auto">
        Have a project in mind, a job opportunity, or just want to say hi? I'm always open to new conversations.
      </p>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* LEFT SIDE: INFO CARDS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {[
            { icon: FaEnvelope, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
            { icon: FaPhone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
            { icon: FaMapMarkerAlt, label: "Location", value: profile.location },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="glass rounded-2xl p-5 flex items-center gap-4 card-hover block"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                <Icon />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                <p className="font-semibold break-all">{value}</p>
              </div>
            </a>
          ))}

          <div className="flex gap-3 pt-2">
            {[
              { icon: FaGithub, href: profile.github },
              { icon: FaLinkedin, href: profile.linkedin },
              { icon: FaTelegram, href: profile.telegram },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl hover:bg-primary hover:text-white transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE: CONTACT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 space-y-4"
        >
          <input
            type="text"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary transition"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary transition"
          />
          <textarea
            required
            rows={5}
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary transition resize-none"
          />
          
          <button 
            type="submit" 
            className={`btn-primary w-full ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : 
             status === "success" ? "Message Sent Successfully ✓" : 
             status === "error" ? "Something went wrong. Try again." : 
             "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}