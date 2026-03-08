import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";

export default function PopUp({ title = "RULES" }) {
    const { isDarkMode } = useTheme();
    const { roomID } = useParams();

    const colors = {
        bg: isDarkMode ? "bg-black" : "bg-slate-50",
        overlay: isDarkMode ? "bg-black/95" : "bg-slate-500/30",
        textMain: isDarkMode ? "text-white" : "text-slate-950",
        border: isDarkMode ? "border-[#7BFF6C]" : "border-[#39A132]",
        footer: isDarkMode ? "bg-[#7BFF6C]/5" : "bg-slate-200/60",
        accentText: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
        accentBg: isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${colors.overlay} backdrop-blur-md z-50 p-4 transition-colors duration-400`}>

            <div className={`relative w-full max-w-[480px] ${colors.bg} border-2 ${colors.border} rounded-2xl shadow-xl overflow-hidden transition-all duration-300`}>

                <div className="h-1 w-full bg-[#7BFF6C]/10 relative overflow-hidden">
                    <div className={`absolute inset-0 w-1/3 animate-[scan_2s_linear_infinite] ${colors.accentBg}`} />
                </div>

                <div className="p-10 pb-0">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col items-center flex-grow">
                            <h2 className={`font-goldman text-4xl ${colors.textMain} tracking-widest uppercase italic font-bold`}>{title}</h2>
                            <div className={`h-[3px] w-24 mt-2 shadow-[0_0_10px_#7BFF6C] ${colors.accentBg}`} />
                        </div>

                        <Link to='/' className={`absolute top-5 right-7 font-goldman text-sm ${isDarkMode ? 'text-[#7BFF6C]/60 hover:text-[#7BFF6C]' : 'text-slate-400 hover:text-red-500'} transition-colors`}>
                            [ ESC ]
                        </Link>
                    </div>

                    <div className={`font-goldman ${colors.textMain} space-y-8 text-sm md:text-base tracking-wide`}>
                        <div className="flex items-start gap-5">
                            <span className={`font-bold text-xl ${colors.accentText}`}>01/</span>
                            <p className="pt-1">Write a coding concept in <span className={`font-bold ${colors.accentText}`}>60 seconds</span>.</p>
                        </div>
                        <div className="flex items-start gap-5">
                            <span className={`font-bold text-xl ${colors.accentText}`}>02/</span>
                            <p className="pt-1">Don’t write the <span className={`underline decoration-dotted ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>actual word</span> anywhere in the code.</p>
                        </div>
                    </div>

                    <div className="mt-12 mb-10 flex justify-center">
                        <Link to={`/rooms/${roomID}/game`} className={`group relative px-12 py-4 text-black font-goldman font-extrabold uppercase tracking-[0.2em] hover:scale-105 transition-all active:scale-95 ${isDarkMode ? "bg-[#7BFF6C] hover:bg-[#5cdb4f]" : "bg-[#39A132] text-white hover:bg-slate-900"}`}>
                            CONFIRM
                            <div className={`absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 ${isDarkMode ? 'border-[#7BFF6C]' : 'border-slate-950'}`} />
                            <div className={`absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 ${isDarkMode ? 'border-[#7BFF6C]' : 'border-slate-950'}`} />
                        </Link>
                    </div>
                </div>

                <div className={`${colors.footer} py-3 px-8 flex justify-between items-center border-t ${isDarkMode ? 'border-[#7BFF6C]/10' : 'border-slate-200'}`}>
                    <span className={`text-[10px] font-mono tracking-tighter ${isDarkMode ? "text-[#7BFF6C]/40" : "text-slate-500"}`}>
                        v1.1.2 // THEME: {isDarkMode ? "CYBER_DK" : "STD_LT"}
                    </span>
                    <div className="flex gap-1.5 items-center">
                        <span className={`text-[9px] font-goldman tracking-tight ${colors.accentText}`}>SESSION_ACTIVE</span>
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${colors.accentBg}`} />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
        </div>
    );
}