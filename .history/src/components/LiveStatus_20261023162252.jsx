import { useState, useEffect } from "react";
import { FaCode, FaServer, FaClock, FaCircle } from "react-icons/fa";

export default function LiveStatus() {
  const [uptime, setUptime] = useState(0);
  const [status, setStatus] = useState("Operational");

  useEffect(() => {
    // Simulate system uptime counter
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
    <div className="glass rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-emerald-500 mb-12">
      <div className="flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          System Status: <span className="text-emerald-500">{status}</span>
        </span>
      </div>

      <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <FaServer /> Uptime: {formatTime(uptime)}
        </div>
        <div className="flex items-center gap-2">
          <FaCode /> Last Deploy: Just now
        </div>
        <div className="flex items-center gap-2">
          <FaClock /> Addis Ababa: {new Date().toLocaleTimeString("en-US", { timeZone: "Africa/Addis_Ababa" })}
        </div>
      </div>
    </div>
  );
}