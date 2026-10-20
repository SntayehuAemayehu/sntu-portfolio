import { FaTimes, FaPrint } from "react-icons/fa";
import { profile, skills, experience, education } from "../data/portfolio";

export default function RecruiterMode({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white text-black overflow-y-auto p-8 md:p-16">
      <button 
        onClick={onClose} 
        className="fixed top-6 right-6 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 shadow-lg"
      >
        <FaTimes />
      </button>
      
      <button 
        onClick={() => window.print()} 
        className="fixed top-6 right-20 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2"
      >
        <FaPrint /> Print to PDF
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2">{profile.name}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{profile.title}</h2>
        <p className="mb-6">{profile.email} | {profile.phone} | {profile.location}</p>
        
        <hr className="mb-6" />
        
        <h3 className="text-2xl font-bold mb-2">Professional Summary</h3>
        <p className="mb-6 text-gray-700">{profile.summary}</p>

        <h3 className="text-2xl font-bold mb-2">Experience</h3>
        {experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <h4 className="font-bold">{exp.role} - {exp.company}</h4>
            <p className="text-sm text-gray-500">{exp.period}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}

        <h3 className="text-2xl font-bold mb-2 mt-8">Education</h3>
        {education.map((edu, i) => (
          <div key={i} className="mb-4">
            <h4 className="font-bold">{edu.degree} - {edu.school}</h4>
            <p className="text-sm text-gray-500">{edu.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
}