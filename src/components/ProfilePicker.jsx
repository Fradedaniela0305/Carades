import { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // Import the hook

export default function ProfilePicker({ profile, setProfile }) {
  const [showCharacters, setShowCharacters] = useState(false);
  const { isDarkMode } = useTheme(); // Access the current theme

  // Theme-aware color variables
  const colors = {
    avatarBg: isDarkMode ? "bg-black" : "bg-white",
    border: isDarkMode ? "border-[#7BFF6C]" : "border-[#39A132]",
    text: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
    gridBg: isDarkMode ? "bg-[#7BFF6C]/5" : "bg-slate-100",
    gridBorder: isDarkMode ? "border-[#7BFF6C]/30" : "border-slate-300",
    glow: isDarkMode ? "shadow-[0_0_20px_rgba(123,255,108,0.25)]" : "shadow-sm"
  };

  const characters = ["🐱", "🐶", "🐸", "🐼", "🦊", "🐰"];

  function handleCharacterClick(character) {
    setProfile(character);
    setShowCharacters(false);
  }

  return (
    <div className="flex flex-col items-center">
      {/* main avatar */}
      <div className="relative group">
        
        {/* hover glow ring - hides in light mode for cleaner look */}
        {isDarkMode && (
          <div className="absolute inset-0 rounded-full border-2 border-[#7BFF6C] opacity-0 group-hover:opacity-100 scale-110 blur-[1px] transition-all duration-300 shadow-[0_0_30px_rgba(123,255,108,0.8)]"></div>
        )}

        <button
          onClick={() => setShowCharacters(!showCharacters)}
          style={{ WebkitTapHighlightColor: "transparent" }}
          // Changed bg-black to colors.avatarBg and border color to colors.border
          className={`relative w-36 h-36 rounded-full appearance-none ${colors.avatarBg} border-2 ${colors.border} flex items-center justify-center text-[4rem] leading-none p-0 m-0 text-center ${colors.glow} hover:scale-105 transition-all outline-none focus:outline-none`}
        >
          {profile}
        </button>
      </div>

      {/* Line that changes the font and color for 'Select Avatar' */}
      <p className={`mt-3 ${colors.text} text-xs font-goldman tracking-[0.2em] uppercase font-bold`}>
        Select Avatar
      </p>

      {/* avatar choices grid */}
      {showCharacters && (
        <div className={`mt-5 grid grid-cols-3 gap-3 p-4 ${colors.gridBg} border ${colors.gridBorder} rounded-xl shadow-lg transition-all`}>
          {characters.map((character) => (
            <button
              key={character}
              onClick={() => handleCharacterClick(character)}
              className={`flex items-center justify-center w-16 h-16 rounded-full text-3xl border transition-all hover:scale-110 outline-none focus:outline-none ${
                profile === character
                  ? `${isDarkMode ? "bg-[#7BFF6C] text-black border-[#7BFF6C]" : "bg-[#39A132] text-white border-[#39A132] shadow-md"}`
                  : `${colors.avatarBg} ${isDarkMode ? "text-white border-[#7BFF6C]/40" : "text-slate-900 border-slate-300"}`
              }`}
            >
              {character}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}