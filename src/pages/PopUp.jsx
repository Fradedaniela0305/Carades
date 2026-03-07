import React, { useState } from "react";

// Icons (Sun for Dark, Moon for Light)
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 21v-2.25m-6.364-.386l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>;

export default function PopUp({ title = "RULES", onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Dynamic Theme Colors
  const colors = {
    accent: isDarkMode ? "#7BFF6C" : "#39A132", // Primary green shifts for visibility
    bg: isDarkMode ? "bg-black" : "bg-slate-50",
    overlay: isDarkMode ? "bg-black/95" : "bg-slate-500/30",
    textMain: isDarkMode ? "text-white" : "text-slate-950",
    border: `border-[${isDarkMode ? "#7BFF6C" : "#39A132"}]`,
    footer: isDarkMode ? "bg-[#7BFF6C]/5" : "bg-slate-200/60",
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${colors.overlay} backdrop-blur-md z-50 p-4 transition-colors duration-400`}>
      
      {/* --- Sun/Moon Theme Toggle (Top Right of Screen) --- */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 p-3 rounded-full border ${colors.border} ${isDarkMode ? "text-[#7BFF6C] bg-black hover:bg-[#7BFF6C] hover:text-black" : "text-[#39A132] bg-slate-100 hover:bg-[#39A132] hover:text-white"} transition-all shadow-[0_0_15px_rgba(123,255,108,0.2)]`}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Main Container */}
      <div className={`relative w-full max-w-[480px] ${colors.bg} border-2 ${colors.border} rounded-2xl shadow-[0_0_30px_rgba(123,255,108,0.15)] overflow-hidden transition-all duration-300`}>
        
        {/* Top Decorative Scanning Bar */}
        <div className="h-1 w-full bg-[#7BFF6C]/10 relative overflow-hidden">
          <div className={`absolute inset-0 w-1/3 animate-[scan_2s_linear_infinite] ${isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"}`} />
        </div>

        {/* --- Card Header Controls --- */}
        <div className="p-10 pb-0">
          <div className="flex justify-between items-center mb-8">
            {/* Title with Goldman Font */}
            <div className="flex flex-col items-center flex-grow">
              <h2 className={`font-goldman text-4xl ${colors.textMain} tracking-widest uppercase italic font-bold`}>
                {title}
              </h2>
              <div className={`h-[3px] w-24 mt-2 shadow-[0_0_10px_#7BFF6C] ${isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"}`} />
            </div>

            {/* Close Button [ ESC ] */}
            <button
              onClick={onClose}
              className={`absolute top-5 right-7 font-goldman text-sm ${isDarkMode ? 'text-[#7BFF6C]/60 hover:text-[#7BFF6C]' : 'text-slate-400 hover:text-red-500'} transition-colors`}
            >
              [ ESC ]
            </button>
          </div>

          {/* Rules Content */}
          <div className={`font-goldman ${colors.textMain} space-y-8 text-sm md:text-base tracking-wide`}>
            <div className="flex items-start gap-5">
              <span className={`font-bold text-xl ${isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"}`}>01/</span>
              <p className="pt-1">Write a coding concept in <span className={`font-bold ${isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"}`}>120 seconds</span>.</p>
            </div>

            <div className="flex items-start gap-5">
              <span className={`font-bold text-xl ${isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"}`}>02/</span>
              <p className="pt-1">Don’t write the <span className={`underline decoration-dotted ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>actual word</span> anywhere in the code.</p>
            </div>

            <div className="flex items-start gap-5">
              <span className={`font-bold text-xl ${isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"}`}>03/</span>
              <p className="pt-1 uppercase tracking-tighter opacity-80">Have fun and happy coding!</p>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="mt-12 mb-10 flex justify-center">
            <button
              onClick={onClose}
              className={`group relative px-12 py-4 text-black font-goldman font-extrabold uppercase tracking-[0.2em] hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(123,255,108,0.2)] ${isDarkMode ? "bg-[#7BFF6C] hover:bg-white" : "bg-[#39A132] text-white hover:bg-slate-900"}`}
            >
              CONFIRM
              {/* --- Card Corner Accents --- */}
              <div className={`absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 transition-colors ${isDarkMode ? 'border-[#7BFF6C]' : 'border-slate-950'}`} />
              <div className={`absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 transition-colors ${isDarkMode ? 'border-[#7BFF6C]' : 'border-slate-950'}`} />
            </button>
          </div>
        </div>

        {/* --- Dynamic Footer --- */}
        <div className={`${colors.footer} py-3 px-8 flex justify-between items-center border-t ${isDarkMode ? 'border-[#7BFF6C]/10' : 'border-slate-200'} transition-all`}>
          <span className={`text-[10px] font-mono tracking-tighter ${isDarkMode ? "text-[#7BFF6C]/40" : "text-slate-500"}`}>
            v1.1.2 // THEME: {isDarkMode ? "CYBER_DK" : "STD_LT"}
          </span>
          <div className="flex gap-1.5 items-center">
            <span className={`text-[9px] font-goldman tracking-tight ${isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"}`}>SESSION_ACTIVE</span>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse [animation-delay:200ms] ${isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"}`} />
          </div>
        </div>
      </div>

      {/* --- Keyframe Animation for Scan Effect --- */}
      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}