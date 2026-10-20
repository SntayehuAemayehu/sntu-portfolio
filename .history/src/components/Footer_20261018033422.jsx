import { profile } from "../data/portfolio";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <FaHeart className="text-red-500 animate-pulse" /> using React & Tailwind
        </p>
      </div>
    </footer>
  );
}