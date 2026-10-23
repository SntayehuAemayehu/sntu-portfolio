import { useState, useEffect } from "react";
import { FaCode, FaServer, FaClock } from "react-icons/fa";

export default function LiveStatus() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setUptime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="glass rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-emerald-500 mb-8 w-full max-w-4xl mx-auto mt-4 shadow-lg">
      
      {/* Live Status Dot */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Status: <span className="text-emerald-500">Available for Work</span>
        </span>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono w-full md:w-auto">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <FaServer className="text-primary" /> Uptime: {formatTime(uptime)}
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <FaCode className="text-accent" /> Last Deploy: Just now
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <FaClock className="text-purple-500" /> Addis Ababa: {new Date().toLocaleTimeString("en-US", { timeZone: "Africa/Addis_Ababa" })}
        </div>
      </div>

    </div>
  );
}