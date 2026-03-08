import { useState } from "react";

export default function ProfilePicker({ profile, setProfile }) {
  const [showCharacters, setShowCharacters] = useState(false);

  const characters = ["🐱", "🐶", "🐸", "🐼", "🦊", "🐰"];

  function handleCharacterClick(character) {
    setProfile(character);
    setShowCharacters(false);
  }

  return (
    <div className="flex flex-col items-center">

      {/* main avatar */}
      <div className="relative group">

        {/* hover glow ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#7BFF6C] opacity-0 group-hover:opacity-100 scale-110 blur-[1px] transition-all duration-300 shadow-[0_0_30px_rgba(123,255,108,0.8)]"></div>

       <button
  onClick={() => setShowCharacters(!showCharacters)}
  style={{ WebkitTapHighlightColor: "transparent" }}
  className="relative w-36 h-36 rounded-full appearance-none bg-black border-2 border-[#7BFF6C] flex items-center justify-center text-[4rem] leading-none p-0 m-0 text-center shadow-[0_0_20px_rgba(123,255,108,0.25)] hover:scale-105 transition-all outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
>
  {profile}
</button>

      </div>

      <p className="mt-3 text-[#7BFF6C] text-xs font-goldman tracking-[0.2em] uppercase">
        Select Avatar
      </p>

      {/* avatar choices */}
      {showCharacters && (
        <div className="mt-5 grid grid-cols-3 gap-3 p-4 bg-[#7BFF6C]/5 border border-[#7BFF6C]/30 rounded-xl shadow-[0_0_20px_rgba(123,255,108,0.1)]">

          {characters.map((character) => (
            <button
              key={character}
              onClick={() => handleCharacterClick(character)}
              className={`flex items-center justify-center w-16 h-16 rounded-full text-3xl border transition-all hover:scale-110 outline-none focus:outline-none ${
                profile === character
                  ? "bg-[#7BFF6C] text-black border-[#7BFF6C] shadow-[0_0_15px_rgba(123,255,108,0.6)]"
                  : "bg-black text-white border-[#7BFF6C]/40 hover:border-[#7BFF6C]"
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