import { FaEnvelope } from "react-icons/fa";

export default function FloatingContact() {
  return (
    <a
      href="mailto:sntualex@gmail.com"
      className="fixed bottom-6 left-6 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:scale-105 transition z-50 flex items-center gap-2 animate-bounce"
    >
      <FaEnvelope /> Hire Me
    </a>
  );
}