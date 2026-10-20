import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaMicrophone, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { profile, skills, experience, education, services } from "../data/portfolio";
import { projects } from "../data/projects";
import { certificates } from "../data/certificates";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sntu's AI Assistant. I know absolutely everything about his skills, projects, education, and experience. You can type or click the mic to speak. How can I help you?", sender: "ai" }
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
    // Make the AI voice sound slightly more natural if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural"));
    if (preferredVoice) utterance.voice = preferredVoice;
    
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
  // THE MASSIVE AI BRAIN (Reads all files)
  // ==========================================
  const generateSmartResponse = (query) => {
    const q = query.replace(/[^\w\s]/gi, ''); // Remove punctuation

    // 1. Greetings & Pleasantries
    if (q.match(/\b(hi|hello|hey|greetings|good morning|good afternoon)\b/)) {
      return "Hello! I am Sntu's smart assistant. I have access to his entire resume, portfolio, and project data. What would you like to know?";
    }
    if (q.match(/\b(thanks|thank you|awesome|great|cool)\b/)) {
      return "You're very welcome! Let me know if you need to know anything else about Sntayehu.";
    }

    // 2. General Identity / Who is he?
    if (q.includes("who is") || q.includes("about him") || q.includes("yourself") || q.includes("sntayehu") || q.includes("sntu")) {
      return `${profile.name} is a highly motivated Software Engineering graduate from ${profile.location}. He specializes in full-stack web development, mobile applications, and networking.`;
    }

    // 3. Skills & Tech Stack
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("know") || q.includes("code")) {
      return `Sntayehu is a Full-Stack Engineer. His top frontend skills are ${skills.frontend.slice(0, 3).join(", ")}. For backend, he uses ${skills.backend[0]}, ${skills.backend[1]}, and ${skills.backend[2]}. He also builds mobile apps using ${skills.mobile[0]} and ${skills.mobile[1]}.`;
    }

    // 4. Specific Tech Matching (If recruiter asks for a specific language)
    const allTechs = [...skills.languages.map(l => l.name), ...skills.frontend, ...skills.backend, ...skills.mobile, ...skills.databases];
    for (let tech of allTechs) {
      if (q.includes(tech.toLowerCase())) {
        return `Yes! Sntayehu has extensive experience with ${tech}. You can see it highlighted in his Skills section.`;
      }
    }

    // 5. Projects (General)
    if (q.includes("project") || q.includes("portfolio") || q.includes("built") || q.includes("apps")) {
      const featured = projects.filter(p => p.featured).map(p => p.title).join(" and ");
      return `He has built several amazing projects, including his ${featured}. You can scroll down to the Projects section to view live demos and GitHub links!`;
    }

    // 6. Specific Projects (DEMAS & Clearance)
    if (q.includes("clearance") || q.includes("internship project")) {
      return "The Clearance Management System is a full-stack app he built during his 4-month internship at Aliyah Software Company. It features role-based access, JWT authentication, and automated approval workflows using React and Django.";
    }
    if (q.includes("demas") || q.includes("graduation") || q.includes("capstone")) {
      return "DEMAS is his final university graduation project. It is a comprehensive full-stack platform deployed on Render, built with React and Django, featuring secure database management and a dynamic frontend.";
    }

    // 7. Experience & Internship
    if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("intern") || q.includes("freelance")) {
      return `He completed a 4-month internship at ${experience[0].company}, where he built the Clearance System. He has also been working as a Freelance Full-Stack Developer since 2024.`;
    }

    // 8. Education & University
    if (q.includes("study") || q.includes("education") || q.includes("university") || q.includes("school") || q.includes("graduate") || q.includes("degree")) {
      return `He graduated with a ${education[0].degree} from ${education[0].school} (${education[0].period}). His coursework included full-stack web development, mobile apps, and networking.`;
    }

    // 9. Certificates & Cisco
    if (q.includes("certificate") || q.includes("certification") || q.includes("cisco") || q.includes("ccna") || q.includes("cnn")) {
      return "He holds several certifications, most notably the Cisco CCNA (CNN) certificate. He also has an Internship certificate from Mekdela Amba University and an E-Learning certificate. You can view the images in the Certificates section.";
    }

    // 10. Contact & Hiring
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("available")) {
      return `He is currently available for work! You can email him at ${profile.email}, call him at ${profile.phone}, or simply use the contact form at the bottom of this page.`;
    }

    // 11. CV / Resume
    if (q.includes("cv") || q.includes("resume") || q.includes("download")) {
      return "You can view and download his CV by clicking the 'Download CV' button in the About section, or by clicking 'Recruiter Mode' in the top navigation bar.";
    }

    // 12. Location & Origin
    if (q.includes("location") || q.includes("where") || q.includes("live") || q.includes("country") || q.includes("ethiopia")) {
      return `He is based in ${profile.location}. He is open to remote work globally and on-site opportunities in Ethiopia.`;
    }

    // 13. Languages Spoken
    if (q.includes("language") || q.includes("speak") || q.includes("amharic") || q.includes("english")) {
      return `He speaks ${profile.languages[0].name} fluently and has professional proficiency in ${profile.languages[1].name}.`;
    }

    // 14. Services Offered
    if (q.includes("service") || q.includes("do for me") || q.includes("help me") || q.includes("offer")) {
      return "He offers Full-Stack Web Development, Mobile App Development (Flutter/Android), UI/UX Design, Network Configuration, and API/Backend Systems.";
    }

    // 15. Soft Skills
    if (q.includes("soft skill") || q.includes("team") || q.includes("problem") || q.includes("manage")) {
      return "He has strong soft skills including Problem Solving, Teamwork, Agile/Scrum Project Management, Software Testing, and Debugging.";
    }

    // 16. Age
    if (q.includes("age") || q.includes("old") || q.includes("birth")) {
      return `Sntayehu is ${profile.age} years old, born on ${profile.birthDate}.`;
    }

    // 17. GitHub / Links
    if (q.includes("github") || q.includes("linkedin") || q.includes("telegram") || q.includes("social")) {
      return `You can find his code on GitHub at ${profile.github}, connect with him on LinkedIn at ${profile.linkedin}, or message him on Telegram at ${profile.telegramHandle}.`;
    }

    // 18. Typo handling
    if (q.includes("experiance") || q.includes("exprience") || q.includes("projet") || q.includes("certificat")) {
      return "It looks like you might have a typo, but I understand! Ask me about his Experience, Projects, or Certificates, and I will give you the details.";
    }

    // 19. General fallback for random questions
    return "That's a great question! While my AI database is still learning, Sntayehu would love to answer that directly. You can email him at sntualex@gmail.com or use the contact form below!";
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
                <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
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
              className="flex-1 bg-slate-100 dark:bg-dark rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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