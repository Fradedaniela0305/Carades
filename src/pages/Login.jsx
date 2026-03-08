import ProfilePicker from "../components/ProfilePicker";
import { useTheme } from "../context/ThemeContext";
import ToggleTheme from "../components/ToggleTheme";
import { Link } from "react-router-dom";

export default function Login({
  nickname,
  setNickname,
  language,
  setLanguage,
  profile,
  setProfile,
}) {
  const { isDarkMode } = useTheme();

  const bgColor = isDarkMode ? "bg-black" : "bg-slate-50";
  const cardBg = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-slate-900";
  const borderColor = isDarkMode ? "border-[#7BFF6C]" : "border-[#39A132]";
  const shadowColor = isDarkMode
    ? "shadow-[0_0_30px_rgba(123,255,108,0.15)]"
    : "shadow-[0_10px_40px_rgba(0,0,0,0.1)]";

  const actionButtonClass = `group relative px-8 py-3 border-2 font-goldman font-extrabold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 text-center ${
    isDarkMode
      ? "border-[#7BFF6C] text-[#7BFF6C] hover:bg-[#7BFF6C] hover:text-black"
      : "border-[#39A132] text-[#39A132] hover:bg-[#39A132] hover:text-white"
  }`;

  const cornerClass = isDarkMode ? "border-[#7BFF6C]" : "border-[#39A132]";

  return (
    <div
      className={`min-h-screen min-w-screen flex items-center justify-center p-6 transition-colors duration-300 ${bgColor} ${textColor}`}
    >
      <ToggleTheme />

      <div
        className={`relative w-full max-w-[520px] border-2 rounded-2xl overflow-hidden transition-all duration-300 ${cardBg} ${borderColor} ${shadowColor}`}
      >
        {/* top scanning bar */}
        <div
          className={`h-1 w-full relative overflow-hidden ${
            isDarkMode ? "bg-[#7BFF6C]/10" : "bg-[#39A132]/10"
          }`}
        >
          <div
            className={`absolute inset-0 w-1/3 animate-[scan_2s_linear_infinite] ${
              isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"
            }`}
          />
        </div>

        <div className="p-10">
          {/* title */}
          <div className="flex flex-col items-center mb-10">
            <h2
              className={`font-goldman text-4xl tracking-widest uppercase italic font-bold ${textColor}`}
            >
              Carades
            </h2>
            <div
              className={`h-[3px] w-24 mt-2 shadow-[0_0_10px_rgba(123,255,108,0.5)] ${
                isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"
              }`}
            />
          </div>

          {/* profile picker */}
          <div className="flex justify-center mb-10">
            <ProfilePicker profile={profile} setProfile={setProfile} />
          </div>

          {/* form */}
          <div className="space-y-6 font-goldman">
            <div>
              <h4
                className={`uppercase tracking-[0.2em] text-sm mb-2 ${
                  isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"
                }`}
              >
                Nickname
              </h4>
              <input
                className={`w-full border rounded-lg px-4 py-3 outline-none transition-all ${
                  isDarkMode
                    ? "bg-white text-black border-[#7BFF6C]/40 focus:border-[#7BFF6C] focus:shadow-[0_0_12px_rgba(123,255,108,0.25)]"
                    : "bg-slate-100 text-slate-900 border-slate-300 focus:border-[#39A132] focus:ring-1 focus:ring-[#39A132]"
                }`}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter nickname"
              />
            </div>

            <div>
              <h4
                className={`uppercase tracking-[0.2em] text-sm mb-2 ${
                  isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"
                }`}
              >
                Language
              </h4>
              <select
                className={`w-full border rounded-lg px-4 py-3 outline-none transition-all ${
                  isDarkMode
                    ? "bg-white text-black border-[#7BFF6C]/40 focus:border-[#7BFF6C]"
                    : "bg-slate-100 text-slate-900 border-slate-300 focus:border-[#39A132]"
                }`}
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
            <Link to="/joinroom" className={actionButtonClass}>
              Join Group
              <div
                className={`absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 ${cornerClass}`}
              />
              <div
                className={`absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 ${cornerClass}`}
              />
            </Link>

            <Link to="/createroom" className={actionButtonClass}>
              Create Group
              <div
                className={`absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 ${cornerClass}`}
              />
              <div
                className={`absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 ${cornerClass}`}
              />
            </Link>
          </div>
        </div>

        {/* footer */}
        <div
          className={`py-3 px-8 flex justify-between items-center border-t ${
            isDarkMode
              ? "bg-[#7BFF6C]/5 border-[#7BFF6C]/10"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <span
            className={`text-[10px] font-mono tracking-tighter ${
              isDarkMode ? "text-[#7BFF6C]/40" : "text-slate-400"
            }`}
          >
            v1.0.0 // LOGIN_PORTAL
          </span>
          <div className="flex gap-1.5 items-center">
            <span
              className={`text-[9px] font-goldman tracking-tight ${
                isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]"
              }`}
            >
              SESSION_READY
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"
              }`}
            />
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