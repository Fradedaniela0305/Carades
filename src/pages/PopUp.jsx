import React from "react";

// PopUp.jsx
export default function PopUp({ title = "RULES", onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-50 p-4">
      
      {/* Main Container - Black background with #7BFF6C accents */}
      <div className="relative w-full max-w-[480px] bg-black border-2 border-[#7BFF6C] rounded-2xl shadow-[0_0_25px_rgba(123,255,108,0.25)] overflow-hidden">
        
        {/* Top Decorative Scanning Bar in Green */}
        <div className="h-1 w-full bg-[#7BFF6C]/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#7BFF6C] w-1/3 animate-[scan_2s_linear_infinite]" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#7BFF6C] hover:text-white font-goldman text-lg transition-colors z-10"
        >
          [ ESC ]
        </button>

        <div className="p-10">
          {/* Title Header - Matching the screenshot style */}
          <div className="mb-8 flex flex-col items-center">
            <h2 className="font-goldman text-4xl text-[#7BFF6C] tracking-widest uppercase italic font-bold">
              {title}
            </h2>
            <div className="h-[3px] w-24 bg-[#7BFF6C] mt-2 shadow-[0_0_10px_#7BFF6C]" />
          </div>

          {/* Rules Content */}
          <div className="font-goldman text-white space-y-8 text-sm md:text-base tracking-wide">
            
            <div className="flex items-start gap-5">
              <span className="text-[#7BFF6C] font-bold text-xl">01/</span>
              <p className="pt-1">You are given a coding concept to write in <span className="text-[#7BFF6C]">120 seconds</span>.</p>
            </div>

            <div className="flex items-start gap-5">
              <span className="text-[#7BFF6C] font-bold text-xl">02/</span>
              <p className="pt-1">Don’t write the <span className="text-[#7BFF6C] underline decoration-dotted">actual word</span> anywhere in the code.</p>
            </div>

            <div className="flex items-start gap-5">
              <span className="text-[#7BFF6C] font-bold text-xl">03/</span>
              <p className="pt-1 uppercase tracking-tighter">Have fun and happy coding!</p>
            </div>

          </div>

          {/* Bottom Action Button - Solid Green with Black Text */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={onClose}
              className="group relative px-12 py-4 bg-[#7BFF6C] text-black font-goldman font-extrabold uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(123,255,108,0.4)]"
            >
              CONFIRM
              
              {/* Corner accent decorations */}
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#7BFF6C] group-hover:border-white transition-colors" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#7BFF6C] group-hover:border-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Decorative background footer */}
        <div className="bg-[#7BFF6C]/5 py-2 px-6 flex justify-between items-center border-t border-[#7BFF6C]/20">
          <span className="text-[10px] text-[#7BFF6C]/40 font-mono tracking-tighter">
            LOCAL_HOST:8080 // SESSION_ACTIVE
          </span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-[#7BFF6C] rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-[#7BFF6C] rounded-full animate-pulse [animation-delay:200ms]" />
            <div className="w-1 h-1 bg-[#7BFF6C] rounded-full animate-pulse [animation-delay:400ms]" />
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