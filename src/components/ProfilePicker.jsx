import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ProfilePicker({ profile, setProfile }) {
  const [showCharacters, setShowCharacters] = useState(false);
  const { isDarkMode } = useTheme();

  // 🔧 avatar alignment control
  const avatarOffsetX = 6;

  const characters = [
    "/avatars/avatar_1-removebg-preview.png",
    "/avatars/avatar_2-removebg-preview.png",
    "/avatars/avatar_3-removebg-preview.png",
    "/avatars/avatar_4-removebg-preview.png",
    "/avatars/avatar_5-removebg-preview.png",
    "/avatars/avatar_6-removebg-preview.png"
  ];

  const defaultAvatar = characters[0];
  const currentAvatar = profile || defaultAvatar;

  const colors = {
    avatarBg: isDarkMode ? "bg-black" : "bg-white",
    border: isDarkMode ? "border-[#7BFF6C]" : "border-[#39A132]",
    text: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
    gridBg: isDarkMode ? "bg-[#7BFF6C]/5" : "bg-slate-100",
    gridBorder: isDarkMode ? "border-[#7BFF6C]/30" : "border-slate-300",
    glow: isDarkMode
      ? "shadow-[0_0_20px_rgba(123,255,108,0.25)]"
      : "shadow-sm"
  };

  function handleCharacterClick(character) {
    setProfile(character);
    setShowCharacters(false);
  }

  return (
    <div className="flex flex-col items-center">
      {/* main avatar */}
      <div className="relative group">
        {isDarkMode && (
          <div className="absolute inset-0 rounded-full border-2 border-[#7BFF6C] opacity-0 group-hover:opacity-100 scale-110 blur-[1px] transition-all duration-300 shadow-[0_0_30px_rgba(123,255,108,0.8)]"></div>
        )}

        <button
          onClick={() => setShowCharacters(!showCharacters)}
          style={{ WebkitTapHighlightColor: "transparent" }}
          className={`relative w-36 h-36 rounded-full appearance-none ${colors.avatarBg} border-2 ${colors.border} flex items-center justify-center ${colors.glow} hover:scale-105 transition-all outline-none focus:outline-none overflow-hidden`}
        >
          <img
            src={currentAvatar}
            alt="avatar"
            style={{ transform: `translateX(${avatarOffsetX}px)` }}
            className="w-[80%] h-[80%] object-contain"
            draggable="false"
          />
        </button>
      </div>

      <p className={`mt-3 ${colors.text} text-xs font-goldman tracking-[0.2em] uppercase font-bold`}>
        Select Avatar
      </p>

      {/* avatar grid */}
      {showCharacters && (
        <div className={`mt-5 grid grid-cols-3 gap-3 p-4 ${colors.gridBg} border ${colors.gridBorder} rounded-xl shadow-lg transition-all`}>
          {characters.map((character) => (
            <button
              key={character}
              onClick={() => handleCharacterClick(character)}
              className={`flex items-center justify-center w-16 h-16 rounded-full border transition-all hover:scale-110 outline-none focus:outline-none overflow-hidden ${
                currentAvatar === character
                  ? `${isDarkMode ? "bg-[#7BFF6C] border-[#7BFF6C]" : "bg-[#39A132] border-[#39A132] shadow-md"}`
                  : `${colors.avatarBg} ${isDarkMode ? "border-[#7BFF6C]/40" : "border-slate-300"}`
              }`}
            >
              <img
                src={character}
                alt="avatar option"
                style={{ transform: `translateX(${avatarOffsetX}px)` }}
                className="w-[75%] h-[75%] object-contain"
                draggable="false"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}