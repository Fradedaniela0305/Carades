import React from "react";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 21v-2.25m-6.364-.386l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>;

export default function ToggleTheme() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 p-3 rounded-full border z-[60] transition-all shadow-lg
        ${isDarkMode 
          ? "text-[#7BFF6C] bg-black border-[#7BFF6C] hover:bg-[#7BFF6C] hover:text-black shadow-[0_0_15px_rgba(123,255,108,0.2)]" 
          : "text-[#39A132] bg-white border-[#39A132] hover:bg-[#39A132] hover:text-white shadow-md"
        }`}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}