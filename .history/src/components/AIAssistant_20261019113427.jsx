import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaMicrophone, FaVolumeUp, FaVolumeMute, FaUser, FaCode, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { profile, skills, experience, education, services } from "../data/portfolio";
import { projects } from "../data/projects";
import { certificates } from "../data/certificates";

// ==========================================
// THE MASSIVE AI KNOWLEDGE BASE
// ==========================================
const KNOWLEDGE_BASE = [
  // --- PERSONAL DETAILS ---
  {
    keywords: ["name", "who", "sntayehu", "alex", "sntu"],
    response: `His full name is ${profile.name}. He is a passionate Software Engineer based in ${profile.location}.`,
  },
  {
    keywords: ["age", "old", "birth", "born", "birthday"],
    response: `Sntayehu was born on ${profile.birthDate}, which makes him ${profile.age} years old.`,
  },
  {
    keywords: ["location", "live", "where", "country", "city", "ethiopia", "address"],
    response: `He is currently based in ${profile.location}. He is open to remote work globally and on-site opportunities within Ethiopia.`,
  },
  {
    keywords: ["language", "speak", "amharic", "english", "oromiffa"],
    response: `He is fluent in ${profile.languages[0].name} (Native) and has ${profile.languages[1].name} proficiency (Professional).`,
  },
  {
    keywords: ["contact", "hire", "email", "phone", "reach", "call", "message"],
    response: `You can reach him directly at ${profile.email} or call him at ${profile.phone}. You can also message him on Telegram at ${profile.telegramHandle}.`,
  },
  {
    keywords: ["github", "git", "code repo", "repository"],
    response: `You can view all his source code on his GitHub profile: ${profile.github}`,
  },
  {
    keywords: ["linkedin", "connect", "professional network"],
    response: `Connect with him professionally on LinkedIn: ${profile.linkedin}`,
  },
  {
    keywords: ["telegram", "chat", "message app"],
    response: `You can message him on Telegram at ${profile.telegramHandle} or click the link: ${profile.telegram}`,
  },
  {
    keywords: ["resume", "cv", "download", "print"],
    response: `You can download his CV by clicking the "Download CV" button in the About section, or by clicking the "Recruiter Mode" button in the top navigation bar for a clean, printable version.`,
  },
  {
    keywords: ["available", "hiring", "status", "work", "freelance"],
    response: `Yes! He is currently ${profile.summary.includes("Available") ? "available" : "open"} for work. He is actively looking for Full-Stack or Mobile Developer roles and freelance projects.`,
  },

  // --- EDUCATION ---
  {
    keywords: ["education", "study", "university", "school", "college", "degree", "graduate", "bsc"],
    response: `He graduated with a ${education[0].degree} from ${education[0].school} between ${education[0].period}. He studied full-stack web development, mobile apps, networking, and database design.`,
  },
  {
    keywords: ["mekdela", "amba", "university name"],
    response: `He attended ${education[0].school}, where he earned his BSc in Software Engineering.`,
  },
  {
    keywords: ["academic", "coursework", "subjects", "classes"],
    response: `His coursework included: ${education[0].highlights ? education[0].highlights.join(", ") : "Web Dev, Mobile Apps, Networking, Software Testing"}.`,
  },

  // --- EXPERIENCE & INTERNSHIP ---
  {
    keywords: ["experience", "work history", "job history", "internship", "intern", "company"],
    response: `He completed a 4-month internship at ${experience[0].company} (${experience[0].period}). He built a Clearance Management System using React and Django. He also has freelance experience since 2024.`,
  },
  {
    keywords: ["aliyah", "bahirdar", "software company"],
    response: `Aliyah Software Company is where he did his internship. He worked on the Clearance Management System, implemented JWT auth, and worked in Agile 2-week sprints.`,
  },
  {
    keywords: ["freelance", "self employed", "clients"],
    response: `Since 2024, he has been working as a Freelance Full-Stack Developer, building web and mobile apps for various clients using React, Django, and Flutter.`,
  },
  {
    keywords: ["teamwork", "soft skills", "problem solving", "management", "agile"],
    response: `His soft skills include Problem Solving, Teamwork, Agile/Scrum Project Management, Software Testing, Debugging, and Software Maintenance.`,
  },

  // --- SKILLS & TECH STACK ---
  {
    keywords: ["skills", "tech stack", "technologies", "know", "what can you do", "expertise"],
    response: `He is a Full-Stack Engineer. His top frontend skills are ${skills.frontend.slice(0, 4).join(", ")}. For backend, he uses ${skills.backend.slice(0, 4).join(", ")}. He also builds mobile apps using ${skills.mobile.join(", ")}.`,
  },
  {
    keywords: ["frontend", "react", "next", "vue", "tailwind", "ui", "css", "html"],
    response: `On the frontend, he excels in React.js, Next.js, Vue.js, Tailwind CSS, Redux, Framer Motion, and Material UI.`,
  },
  {
    keywords: ["backend", "django", "node", "express", "flask", "fastapi", "api"],
    response: `For backend development, he uses Django, Django REST Framework, Node.js, Express.js, FastAPI, and Flask.`,
  },
  {
    keywords: ["mobile", "flutter", "android", "kotlin", "java", "dart", "ios"],
    response: `He develops mobile apps using Flutter (Dart), Android Studio (Kotlin/Java), and React Native.`,
  },
  {
    keywords: ["database", "sql", "postgres", "mysql", "mongo", "firebase", "redis"],
    response: `He is proficient with databases including PostgreSQL, MySQL, MongoDB, SQLite, Firebase, and Redis.`,
  },
  {
    keywords: ["python", "py"],
    response: `Yes, he is highly skilled in Python, using it for backend development with Django, FastAPI, and Flask.`,
  },
  {
    keywords: ["java", "kotlin"],
    response: `He uses Java and Kotlin primarily for native Android app development.`,
  },
  {
    keywords: ["javascript", "js", "typescript", "ts"],
    response: `He is an expert in JavaScript and TypeScript, using them for React frontends and Node.js backends.`,
  },
  {
    keywords: ["devops", "docker", "aws", "linux", "git", "ci/cd", "vercel"],
    response: `His DevOps skills include Git, GitHub, Docker, Linux, Nginx, AWS, CI/CD, and deploying on Vercel.`,
  },

  // --- PROJECTS ---
  {
    keywords: ["projects", "portfolio", "built", "apps", "apps", "work", "showcase"],
    response: `He has built several projects, including the Clearance Management System, DEMAS, a Hospital Management System, and a Mobile Banking App. Scroll down to the Projects section to see them!`,
  },
  {
    keywords: ["clearance", "internship project", "management system"],
    response: `The Clearance Management System is a full-stack platform he built during his internship at Aliyah Software Company. It features role-based access control, JWT authentication, real-time status tracking, and automated approval workflows. Tech: React, Django REST, PostgreSQL.`,
  },
  {
    keywords: ["demas", "capstone", "graduation project"],
    response: `DEMAS is his final university graduation project. It is a comprehensive full-stack platform deployed on Render, built with React and Django. It includes secure authentication and a dynamic frontend.`,
  },
  {
    keywords: ["hospital", "medical", "doctor", "patient"],
    response: `The Hospital Management System is an academic project featuring patient records, appointment scheduling, doctor dashboards, and role-based access control. Tech: React, Node.js, MongoDB.`,
  },
  {
    keywords: ["bank", "banking", "finance", "money"],
    response: `He built a Mobile Banking App using Flutter and Dart. It features biometric authentication, transaction history, real-time balance, and secure REST API integration.`,
  },
  {
    keywords: ["ecommerce", "e-commerce", "shop", "cart", "payment"],
    response: `He built a Full-Stack E-Commerce Platform with a product catalog, cart, JWT authentication, payment integration, and an admin dashboard. Tech: React, Django REST, PostgreSQL.`,
  },
  {
    keywords: ["network", "cisco", "toolkit", "router", "switch"],
    response: `He built a Network Configuration Toolkit using Python and Netmiko for subnetting, router/switch automation, and network diagnostics.`,
  },

  // --- CERTIFICATES ---
  {
    keywords: ["certificates", "certification", "certified", "award"],
    response: `He holds several certificates, including the Cisco CCNA (CNN) certificate, an Internship Certificate from Mekdela Amba University, an E-Learning Certificate, and his Degree Certificate. Scroll to the Certificates section to see them!`,
  },
  {
    keywords: ["cisco", "ccna", "cnn", "networking cert"],
    response: `Yes! He is Cisco CCNA (CNN) certified. He studied OSI/TCP-IP models, routing & switching, subnetting, VLANs, network security, and Cisco IOS configuration.`,
  },
  {
    keywords: ["internship cert", "university cert", "e-learning"],
    response: `He received his Internship Certificate from Mekdela Amba University after his 4-month placement at Aliyah Software Company. He also holds an E-Learning certificate.`,
  },

  // --- SERVICES ---
  {
    keywords: ["services", "offer", "help me", "do for me", "hire you"],
    response: `He offers Full-Stack Development, Mobile App Development, Network Configuration, UI/UX Design, API & Backend Systems, and Debugging & Optimization.`,
  },
  {
    keywords: ["network config", "router setup", "cisco config"],
    response: `He offers Network Configuration services, including router/switch setup, subnetting, and network troubleshooting.`,
  },
  {
    keywords: ["ui/ux", "design", "gui", "graphic", "video"],
    response: `He provides UI/UX and GUI Design services. He is also skilled in Graphic Design and Video Editing.`,
  },

  // --- WEBSITE FEATURES ---
  {
    keywords: ["recruiter mode", "print", "pdf"],
    response: `The Recruiter Mode button in the top navigation bar opens a clean, printable version of his resume, optimized for printing or saving as a PDF.`,
  },
  {
    keywords: ["ai", "robot", "chatbot", "who are you"],
    response: `I am Sntu's custom AI Assistant! I was built directly into his React frontend to help recruiters find information about his skills, projects, and experience instantly.`,
  },
  {
    keywords: ["language", "translate", "amharic", "oromiffa"],
    response: `You can change the website language using the dropdown in the top navigation bar! It supports English, Amharic, and Oromiffa.`,
  },
  {
    keywords: ["terminal", "console", "devterminal", "command line"],
    response: `Sntayehu built an interactive Developer Console in the About section! Scroll down and type 'help' to see a list of commands.`,
  },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sntu's AI Assistant. I know absolutely everything about his website, skills, projects, education, and experience. Ask me anything, or use the mic to speak!", sender: "ai" }
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
      const response = generateIntelligentResponse(messageText.toLowerCase());
      setMessages((prev) => [...prev, { text: response, sender: "ai" }]);
      speakText(response);
    }, 700); // Simulated "thinking" delay
  };

  // ==========================================
  // THE SMART SEARCH ALGORITHM (Scoring System)
  // ==========================================
  const generateIntelligentResponse = (query) => {
    const cleanQuery = query.replace(/[^\w\s]/gi, '').toLowerCase();
    
    // 1. Check for Greetings
    if (cleanQuery.match(/\b(hi|hello|hey|greetings|good morning|good afternoon)\b/)) {
      return "Hello! I am Sntu's smart assistant. I have access to his entire resume, portfolio, and project data. What would you like to know?";
    }
    if (cleanQuery.match(/\b(thanks|thank you|awesome|great|cool)\b/)) {
      return "You're very welcome! Let me know if you need to know anything else about Sntayehu.";
    }

    // 2. Typo Handling
    if (cleanQuery.includes("experiance") || cleanQuery.includes("exprience") || cleanQuery.includes("projet") || cleanQuery.includes("certificat")) {
      return "It looks like you might have a typo, but I understand! Ask me about his Experience, Projects, or Certificates, and I will give you the details.";
    }

    // 3. Intelligent Scoring System
    let bestMatch = null;
    let highestScore = 0;

    KNOWLEDGE_BASE.forEach(item => {
      let score = 0;
      item.keywords.forEach(keyword => {
        // Exact match gets 10 points
        if (cleanQuery.includes(keyword)) score += 10;
        // Partial match (word inside sentence) gets 5 points
        else if (keyword.split(' ').some(word => cleanQuery.includes(word))) score += 5;
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    // If we found a strong match (score > 10)
    if (highestScore >= 10 && bestMatch) {
      return bestMatch.response;
    }

    // Fallback if no strong match found
    return "That's a great question! While my local AI database doesn't have a specific answer for that, Sntayehu would love to answer it directly. You can email him at sntualex@gmail.com or use the contact form below!";
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-96 glass rounded-2xl mb-4 flex flex-col overflow-hidden shadow-2xl border border-primary/20">
          {/* Header */}
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
          
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-dark/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-primary text-white rounded-br-none" 
                    : "bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-bl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2 bg-white dark:bg-card">
            <button 
              type="button" 
              onClick={startListening}
              className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300"}`}
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
            <button type="submit" className="w-10 h-10 shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition animate-bounce"
      >
        <FaRobot />
      </button>
    </div>
  );
}