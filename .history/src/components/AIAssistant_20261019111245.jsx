import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaMicrophone, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { profile, skills, experience, education } from "../data/portfolio";
import { projects } from "../data/projects";
import { certificates } from "../data/certificates";
import { services } from "../data/portfolio"; // Assuming services is here

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sntu's AI Assistant. I know everything about his skills, projects, education, and experience. How can I help you?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // AI SPEAKING (Text-to-Speech)
  const speakText = (text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // RECRUITER SPEAKING (Speech-to-Text)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      handleSend(null, speechResult);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSend = (e, voiceInput = null) => {
    if (e) e.preventDefault();
    const messageText = voiceInput || input;
    if (!messageText.trim()) return;

    const userMsg = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = generateSmartResponse(messageText.toLowerCase());
      setMessages((prev) => [...prev, { text: response, sender: "ai" }]);
      speakText(response);
    }, 600);
  };

  // ==========================================
  // THE "BRAIN" OF THE AI (Scans all your data)
  // ==========================================
  const generateSmartResponse = (query) => {
    // 1. Check for Greetings
    if (query.match(/\b(hi|hello|hey|greetings)\b/)) {
      return "Hello! I am Sntu's smart assistant. You can ask me about his experience, projects, skills, education, or how to contact him.";
    }

    // 2. Check for Skills
    if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("language")) {
      return `Sntayehu is a Full-Stack Engineer. His top frontend skills are ${skills.frontend.slice(0, 3).join(", ")}. For backend, he uses ${skills.backend[0]} and ${skills.backend[1]}. He also builds mobile apps using ${skills.mobile[0]}.`;
    }

    // 3. Check for Projects
    if (query.includes("project") || query.includes("portfolio") || query.includes("built")) {
      const featured = projects.filter(p => p.featured).map(p => p.title).join(" and ");
      return `He has built several amazing projects, including his ${featured}. You can scroll down to the Projects section to view live demos and GitHub links!`;
    }

    // 4. Check for Experience / Internship
    if (query.includes("experience") || query.includes("work") || query.includes("job") || query.includes("intern")) {
      return `He completed a 4-month internship at ${experience[0].company}, where he built a Clearance Management System using React and Django. He has also been freelancing as a Full-Stack Developer since 2024.`;
    }

    // 5. Check for Education
    if (query.includes("study") || query.includes("education") || query.includes("university") || query.includes("school") || query.includes("graduate")) {
      return `He graduated with a BSc in ${education[0].degree} from ${education[0].school} in 2026.`;
    }

    // 6. Check for Certificates
    if (query.includes("certificate") || query.includes("certification") || query.includes("cisco") || query.includes("ccna")) {
      const certs = certificates.map(c => c.title).slice(0, 2).join(" and ");
      return `He holds several certifications, including his ${certs}. You can view the actual certificate images in the Certificates section.`;
    }

    // 7. Check for Contact / Hire
    if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("phone") || query.includes("reach")) {
      return `He is currently available for work! You can email him at ${profile.email}, call him at ${profile.phone}, or use the contact form at the bottom of this page.`;
    }

    // 8. Check for Services
    if (query.includes("service") || query.includes("do for me") || query.includes("help me")) {
      return "He offers Full-Stack Web Development, Mobile App Development (Flutter/Android), UI/UX Design, and Network Configuration.";
    }

    // 9. Check for specific name mentions
    if (query.includes("sntayehu") || query.includes("sntu") || query.includes("who is")) {
      return `Sntayehu Alemayehu is a highly motivated Software Engineer from Ethiopia. He specializes in building scalable web applications using React and Django.`;
    }

    // 10. Check for Location
    if (query.includes("location") || query.includes("where") || query.includes("live") || query.includes("country")) {
      return `He is based in ${profile.location}.`;
    }

    // 11. Fallback (If nothing matches)
    return "That's a great question! While my database is still learning, Sntayehu would love to answer that directly. You can email him at sntualex@gmail.com!";
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-96 glass rounded-2xl mb-4 flex flex-col overflow-hidden shadow-2xl border border-primary/20">
          <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="text-xl" />
              <span className="font-bold">Sntu's Smart AI</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMuted(!isMuted)} title="Mute AI Voice">
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <button onClick={() => setIsOpen(false)}><FaTimes /></button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-dark/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.sender === "user" ? "bg-primary text-white rounded-br-none" : "bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-bl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2 bg-white dark:bg-card">
            <button 
              type="button" 
              onClick={startListening}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`}
            >
              <FaMicrophone />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask me anything..."}
              className="flex-1 bg-slate-100 dark:bg-dark rounded-full px-4 py-2 text-sm focus:outline-none"
            />
            <button type="submit" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition animate-bounce">
        <FaRobot />
      </button>
    </div>
  );
}