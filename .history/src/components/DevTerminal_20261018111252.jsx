import { useState } from "react";

export default function DevTerminal() {
  const [history, setHistory] = useState([{ text: "Welcome to Sntayehu's OS. Type 'help' to start.", type: "system" }]);
  const [input, setInput] = useState("");

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let newHistory = [...history, { text: `guest@sntu:~$ ${input}`, type: "user" }];

      switch (cmd) {
        case "help":
          newHistory.push({ text: "Available commands: whoami, skills, education, contact, clear", type: "system" });
          break;
        case "whoami":
          newHistory.push({ text: "Sntayehu Alemayehu - Full Stack Developer & Software Engineering Graduate.", type: "output" });
          break;
        case "skills":
          newHistory.push({ text: "React, Django, Node.js, Flutter, Python, Java, PostgreSQL, Tailwind.", type: "output" });
          break;
        case "education":
          newHistory.push({ text: "BSc in Software Engineering, Mekdela Amba University (2022-2026).", type: "output" });
          break;
        case "contact":
          newHistory.push({ text: "Email: sntualex@gmail.com | Phone: +251 918 116 960", type: "output" });
          break;
        case "clear":
          newHistory = [];
          break;
        default:
          newHistory.push({ text: `Command not found: ${cmd}`, type: "error" });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div className="bg-[#0a0a0f] border border-slate-800 rounded-xl p-4 font-mono text-sm text-green-400 shadow-2xl max-w-2xl mx-auto my-10 h-72 overflow-y-auto">
      {history.map((line, i) => (
        <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-400' : line.type === 'system' ? 'text-slate-400' : 'text-green-400'}`}>
          {line.text}
        </div>
      ))}
      <div className="flex items-center mt-2">
        <span className="text-blue-400 mr-2">guest@sntu:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent outline-none flex-1 text-white"
          autoFocus
        />
      </div>
    </div>
  );
}