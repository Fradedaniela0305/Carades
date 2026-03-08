export default function Toast({ message, isDarkMode }) {
  return (
    <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 border-2 rounded-xl font-goldman animate-[slideDown_0.5s_ease-out] shadow-2xl backdrop-blur-md
      ${isDarkMode 
        ? "bg-black/80 border-[#7BFF6C] text-[#7BFF6C] shadow-[0_0_20px_rgba(123,255,108,0.3)]" 
        : "bg-white/90 border-[#39A132] text-[#39A132] shadow-lg"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"}`} />
        <span className="tracking-[0.1em] uppercase text-sm font-bold">
          {message}
        </span>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}