import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { LanguageProvider } from "./context/LanguageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <LanguageProvider> {/* <--- THIS WAS MISSING */}
      <App />
    
  </React.StrictMode>
);