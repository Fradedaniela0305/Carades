import ProfilePicker from "../components/ProfilePicker";
import { Link } from "react-router-dom"

export default function Login({
  nickname,
  setNickname,
  language,
  setLanguage,
  profile,
  setProfile,
}) {

    const guardNickname = (e) => {
        if (!nickname.trim()) {
          e.preventDefault();
          alert("Please enter a nickname first");
        }
      };
  return (
    <div className="min-h-screen min-w-screen bg-black text-white flex items-center justify-center p-6">
      <div className="relative w-full max-w-[520px] bg-black border-2 border-[#7BFF6C] rounded-2xl shadow-[0_0_30px_rgba(123,255,108,0.15)] overflow-hidden">
        
        {/* top scanning bar */}
        <div className="h-1 w-full bg-[#7BFF6C]/10 relative overflow-hidden">
          <div className="absolute inset-0 w-1/3 animate-[scan_2s_linear_infinite] bg-[#7BFF6C]" />
        </div>

        <div className="p-10">
          {/* title */}
          <div className="flex flex-col items-center mb-10">
            <h2 className="font-goldman text-4xl tracking-widest uppercase italic font-bold text-white">
              Carades
            </h2>
            <div className="h-[3px] w-24 mt-2 bg-[#7BFF6C] shadow-[0_0_10px_#7BFF6C]" />
          </div>

          {/* profile picker */}
          <div className="flex justify-center mb-10">
            <ProfilePicker profile={profile} setProfile={setProfile} />
          </div>

          {/* form */}
          <div className="space-y-6 font-goldman">
            <div>
              <h4 className="text-[#7BFF6C] uppercase tracking-[0.2em] text-sm mb-2">
                Nickname
              </h4>
              <input
                className="w-full bg-white text-black border border-[#7BFF6C]/40 rounded-lg px-4 py-3 outline-none focus:border-[#7BFF6C] focus:shadow-[0_0_12px_rgba(123,255,108,0.25)]"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter nickname"
              />
            </div>

            <div>
              <h4 className="text-[#7BFF6C] uppercase tracking-[0.2em] text-sm mb-2">
                Language
              </h4>
              <select
                className="w-full bg-white text-black border border-[#7BFF6C]/40 rounded-lg px-4 py-3 outline-none focus:border-[#7BFF6C] focus:shadow-[0_0_12px_rgba(123,255,108,0.25)]"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Select language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
          </div>

          {/* actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/joinroom" onClick={guardNickname} className="group relative px-8 py-3 border-2 border-[#7BFF6C] text-[#7BFF6C] font-goldman font-extrabold uppercase tracking-[0.2em] hover:bg-[#7BFF6C] hover:text-black hover:scale-105 transition-all active:scale-95">
              Join Group
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#7BFF6C]" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#7BFF6C]" />
            </Link>

            <Link to='/createroom' onClick={guardNickname} className="group relative px-8 py-3 border-2 border-[#7BFF6C] text-[#7BFF6C] font-goldman font-extrabold uppercase tracking-[0.2em] hover:bg-[#7BFF6C] hover:text-black hover:scale-105 transition-all active:scale-95">
              Create Group
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#7BFF6C]" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#7BFF6C]" />
            </Link>
          </div>
        </div>

        {/* footer */}
        <div className="bg-[#7BFF6C]/5 py-3 px-8 flex justify-between items-center border-t border-[#7BFF6C]/10">
          <span className="text-[10px] font-mono tracking-tighter text-[#7BFF6C]/40">
            v1.0.0 // LOGIN_PORTAL
          </span>
          <div className="flex gap-1.5 items-center">
            <span className="text-[9px] font-goldman tracking-tight text-[#7BFF6C]">
              SESSION_READY
            </span>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#7BFF6C]" />
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