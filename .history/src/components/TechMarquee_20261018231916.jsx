import { skills } from "../data/portfolio";

export default function TechMarquee() {
  const allSkills = [
    ...skills.frontend, 
    ...skills.backend, 
    ...skills.mobile, 
    ...skills.databases, 
    ...skills.languages.map(l => l.name)
  ];

  return (
    <div className="w-full overflow-hidden bg-slate-100 dark:bg-card py-4 border-y border-slate-200 dark:border-slate-800 relative flex">
      <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
        {allSkills.map((skill, index) => (
          <span key={index} className="text-xl font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-8">
            {skill} <span className="text-primary">•</span>
          </span>
        ))}
        {allSkills.map((skill, index) => (
          <span key={`dup-${index}`} className="text-xl font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-8">
            {skill} <span className="text-primary">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}