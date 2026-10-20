import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import { profile, skills, experience, education } from "../data/portfolio";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sntu's AI assistant. Ask me anything about his skills, experience, or projects!", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = generateResponse(userMsg.text.toLowerCase());
      setMessages((prev) => [...prev, { text: response, sender: "ai" }]);
    }, 800);
  };

  const generateResponse = (query) => {
    if (query.includes("skill") || query.includes("tech") || query.includes("know")) {
      return `Sntayehu is highly skilled in ${skills.frontend.slice(0, 3).join(", ")}, and backend technologies like ${skills.backend[0]}. He also does mobile development with ${skills.mobile[0]}.`;
    }
    if (query.includes("experience") || query.includes("work") || query.includes("job")) {
      return `He recently completed a 4-month internship at ${experience[0].company} where he built a ${experience[0].tags[0]}.`;
    }
    if (query.includes("contact") || query.includes("hire") || query.includes("email")) {
      return `You can reach him directly at ${profile.email} or call ${profile.phone}. He is currently available for work!`;
    }
    return "That's a great question! You can email Sntayehu at sntualex@gmail.com or use the contact form below!";
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-96 glass rounded-2xl mb-4 flex flex-col overflow-hidden shadow-2xl border border-primary/20">
          <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="text-xl" />
              <span className="font-bold">Sntu's AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-dark/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.sender === "user" 
                    ? "bg-primary text-white rounded-br-none" 
                    : "bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-bl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2 bg-white dark:bg-card">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my skills..."
              className="flex-1 bg-slate-100 dark:bg-dark rounded-full px-4 py-2 text-sm focus:outline-none"
            />
            <button type="submit" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition animate-bounce"
      >
        <FaRobot />
      </button>
    </div>
  );
}