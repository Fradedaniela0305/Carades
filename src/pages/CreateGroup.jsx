import { useNavigate } from "react-router-dom";
import { ref, set, serverTimestamp } from "firebase/database";
import { db } from "../lib/firebase";
import { useTheme } from "../context/ThemeContext";


export default function CreateGroup({ nickname, language, profile, roomId, setRoomId }) {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();


    // Integrated color palette from PopUp
    const colors = {
        bg: isDarkMode ? "bg-black" : "bg-slate-50",
        pageBg: isDarkMode ? "bg-black" : "bg-slate-200",
        textMain: isDarkMode ? "text-white" : "text-slate-950",
        border: isDarkMode ? "border-[#7BFF6C]" : "border-[#39A132]",
        card: isDarkMode ? "bg-[#7BFF6C]/5 border-[#7BFF6C]/30" : "bg-white border-slate-300 shadow-sm",
        footer: isDarkMode ? "bg-[#7BFF6C]/5" : "bg-slate-200/60",
        accentText: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
        accentBg: isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]",
        button: isDarkMode
            ? "border-[#7BFF6C] text-[#7BFF6C] hover:bg-[#7BFF6C] hover:text-black"
            : "border-[#39A132] text-[#39A132] hover:bg-[#39A132] hover:text-white"
    };


    function generateRoomCode(length = 6) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }


    async function createGroup() {
        if (!nickname || !language || !profile) {
            alert("Please complete your profile before creating a group.");
            return;
        }


        const roomCode = generateRoomCode();
        const playerId = crypto.randomUUID();
        localStorage.setItem("playerID", playerId)


        await set(ref(db, `rooms/${roomCode}`), {
            language: language,
            createdAt: serverTimestamp(),
            players: {
                [playerId]: {
                    name: nickname,
                    score: 0,
                    language: language,
                    profile: profile,
                },
            },
            currentCoder: playerId,
            concept: "",
            roundActive: false,
        });


        setRoomId(roomCode);
        navigate(`/rooms/${roomCode}/popup`);
    }


    return (
        <div className={`min-h-screen min-w-screen ${colors.pageBg} flex items-center justify-center p-6 transition-colors duration-400`}>
            <div className={`relative w-full max-w-[520px] ${colors.bg} border-2 ${colors.border} rounded-2xl shadow-xl overflow-hidden transition-all duration-300`}>


                {/* Top Scanning Bar */}
                <div className={`h-1 w-full ${isDarkMode ? 'bg-[#7BFF6C]/10' : 'bg-slate-200'} relative overflow-hidden`}>
                    <div className={`absolute inset-0 w-1/3 animate-[scan_2s_linear_infinite] ${colors.accentBg}`} />
                </div>


                <div className="p-10">
                    {/* Title Section */}
                    <div className="flex flex-col items-center mb-10">
                        <h2 className={`font-goldman text-4xl tracking-widest uppercase italic font-bold ${colors.textMain}`}>
                            Create Group
                        </h2>
                        <div className={`h-[3px] w-28 mt-2 ${colors.accentBg} ${isDarkMode ? 'shadow-[0_0_10px_#7BFF6C]' : ''}`} />
                    </div>


                    <div className="font-goldman space-y-6">
                        {/* Player Summary Card */}
                        <div className={`border rounded-xl p-6 ${colors.card}`}>
                            <div className="flex items-center gap-5 mb-6">
                                <div className={`w-16 h-16 rounded-full border-2 ${colors.border} ${isDarkMode ? 'bg-black' : 'bg-slate-50'} flex items-center justify-center overflow-hidden shadow-sm`}>
                                    <img
                                        src={profile || "/avatars/avatar_1-removebg-preview.png"}
                                        alt="Host avatar"
                                        className="w-[75%] h-[75%] object-contain"
                                        draggable="false"
                                        style={{ transform: "translateX(2px)" }}
                                    />
                                </div>


                                <div className="flex flex-col">
                                    <span className={`${colors.accentText} uppercase tracking-[0.2em] text-[10px] font-bold`}>
                                        HOST_PROFILE
                                    </span>
                                    <span className={`${colors.textMain} text-xl font-bold`}>
                                        {nickname || "Unknown Player"}
                                    </span>
                                </div>
                            </div>


                            <div className="space-y-4 text-sm tracking-wide">
                                <div className={`flex justify-between border-b ${isDarkMode ? 'border-[#7BFF6C]/10' : 'border-slate-100'} pb-2`}>
                                    <span className={`${colors.accentText} uppercase text-xs`}>ID_IDENTIFIER</span>
                                    <span className={colors.textMain}>{nickname || "—"}</span>
                                </div>


                                <div className={`flex justify-between border-b ${isDarkMode ? 'border-[#7BFF6C]/10' : 'border-slate-100'} pb-2`}>
                                    <span className={`${colors.accentText} uppercase text-xs`}>REGION_LANG</span>
                                    <span className={`${colors.textMain} capitalize`}>{language || "—"}</span>
                                </div>


                                <div className="flex justify-between">
                                    <span className={`${colors.accentText} uppercase text-xs`}>AVATAR_TYPE</span>
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={profile || "/avatars/avatar_1-removebg-preview.png"}
                                            alt="Selected avatar"
                                            className="w-full h-full object-contain"
                                            draggable="false"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Launch Button */}
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={createGroup}
                                className={`group relative px-12 py-4 border-2 font-goldman font-extrabold uppercase tracking-[0.2em] transition-all active:scale-95 ${colors.button}`}
                            >
                                Launch Group
                                {/* Visual Corner Accents */}
                                <div className={`absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 ${colors.border}`} />
                                <div className={`absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 ${colors.border}`} />
                            </button>
                        </div>
                    </div>
                </div>


                {/* Status Footer */}
                <div className={`${colors.footer} py-3 px-8 flex justify-between items-center border-t ${isDarkMode ? 'border-[#7BFF6C]/10' : 'border-slate-200'}`}>
                    <span className={`text-[10px] font-mono tracking-tighter ${isDarkMode ? "text-[#7BFF6C]/40" : "text-slate-500"}`}>
                        v1.0.0 // STATUS: READY_TO_INITIALIZE
                    </span>
                    <div className="flex gap-1.5 items-center">
                        <span className={`text-[9px] font-goldman tracking-tight ${colors.accentText}`}>
                            SESSION_PENDING
                        </span>
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
