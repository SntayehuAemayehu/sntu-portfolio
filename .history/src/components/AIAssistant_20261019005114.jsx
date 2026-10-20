import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaMicrophone, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { profile, skills, experience } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";

export default function AIAssistant() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sntu's AI assistant. You can type or click the mic to speak!", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Text-to-Speech (AI Speaking)
  const speakText = (text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    // Map lang to voice language
    utterance.lang = lang === "AM" ? "am-ET" : lang === "OR" ? "om-ET" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-Text (Recruiter Speaking)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "AM" ? "am-ET" : lang === "OR" ? "om-ET" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      handleSend(null, speechResult); // Auto-send after speaking
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
      const response = generateResponse(messageText.toLowerCase());
      setMessages((prev) => [...prev, { text: response, sender: "ai" }]);
      speakText(response); // AI speaks the response!
    }, 800);
  };

  // Multi-lingual AI Brain
  const generateResponse = (query) => {
    if (lang === "AM") {
      if (query.includes("ክህሎት") || query.includes("skill")) return `ስንታየሁ በ${skills.frontend[0]}፣ ${skills.frontend[1]} እና ${skills.backend[0]} የተሰራጨ ነው።`;
      if (query.includes("ስራ") || query.includes("experience")) return `እሱ በአሊያህ ሶፍትዌር ኩባንያ ውስጥ የ4 ወር ስልጠና አጠናቅቋል።`;
      if (query.includes("አግኝ") || query.includes("contact")) return `ኢሜል፡ ${profile.email}፣ ስልክ፡ ${profile.phone}።`;
      return "ስለዚህ ጥያቄ እርግጠኛ አልሆንኩም። እባክዎ በኢሜል ያግኙት።";
    }
    if (lang === "OR") {
      if (query.includes("dandeettii") || query.includes("skill")) return `Sntayehu ${skills.frontend[0]}, ${skills.frontend[1]} fi ${skills.backend[0]} irratti dandeettii qaba.`;
      if (query.includes("muuxannoo") || query.includes("experience")) return `Inni Aliyah Software Company keessatti ji'a 4 leenjii xumureera.`;
      if (query.includes("qunnamtii") || query.includes("contact")) return `Imeelii: ${profile.email}, Bilbila: ${profile.phone}.`;
      return "Gaaffii kanaaf hin mirkaneeffanne. Imeeliin qunnamaa.";
    }
    // Default English
    if (query.includes("skill") || query.includes("tech")) return `Sntayehu is highly skilled in ${skills.frontend.slice(0, 2).join(" and ")}, and backend like ${skills.backend[0]}.`;
    if (query.includes("experience") || query.includes("work")) return `He completed a 4-month internship at ${experience[0].company}.`;
    if (query.includes("contact") || query.includes("hire")) return `You can reach him at ${profile.email} or ${profile.phone}.`;
    return "I'm not sure about that. You can email him directly at sntualex@gmail.com!";
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-96 glass rounded-2xl mb-4 flex flex-col overflow-hidden shadow-2xl border border-primary/20">
          <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="text-xl" />
              <span className="font-bold">AI Assistant</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMuted(!isMuted)} title="Mute/Unmute AI Voice">
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
              placeholder={isListening ? "Listening..." : "Type or speak..."}
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