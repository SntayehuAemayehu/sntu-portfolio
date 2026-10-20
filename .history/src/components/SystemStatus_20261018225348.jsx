import { useState, useEffect } from "react";
import { FaCircle, FaClock, FaServer, FaCode } from "react-icons/fa";

export default function SystemStatus() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [ping, setPing] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Africa/Addis_Ababa" }));
      // Simulate live server ping
      setPing(Math.floor(Math.random() * 20) + 15); 
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-3 border border-emerald-500/30">
        <FaCircle className="text-emerald-500 animate-pulse text-xs" />
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Status: <span className="text-emerald-500">Available for Work</span></span>
      </div>
      
      <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
        <FaClock className="text-primary" />
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Addis Ababa: {time}</span>
      </div>

      <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
        <FaServer className="text-accent" />
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">API Ping: <span className="text-accent">{ping}ms</span></span>
      </div>

      <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
        <FaCode className="text-purple-500" />
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Years Coding: 3+</span>
      </div>
    </div>
  );
}