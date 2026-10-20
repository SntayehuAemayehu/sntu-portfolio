import { createContext, useContext, useState } from "react";

export const translations = {
  EN: {
    about: "About Me",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    summary: "Highly motivated Software Engineering graduate from Mekdela Amba University...",
    downloadCV: "Download CV",
    contactMe: "Contact Me",
  },
  AM: {
    about: "ስለ እኔ",
    skills: "ክህሎቶች",
    projects: "ፕሮጀክቶች",
    contact: "አግኙኝ",
    summary: "በመቅደላ አምባ ዩኒቨርሲቲ የሶፍትዌር ምህንድስና ተመራቂ...",
    downloadCV: "ሲቪ አውርድ",
    contactMe: "አግኙኝ",
  },
  OR: {
    about: "Waa'ee Koo",
    skills: "Dandeettii",
    projects: "Pirojektoota",
    contact: "Nu Qunnamaa",
    summary: "Mekdela Amba University irraa Software Engineering eebbifame...",
    downloadCV: "CV Buusi",
    contactMe: "Nu Qunnamaa",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("EN");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);