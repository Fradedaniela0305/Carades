import { useNavigate } from "react-router-dom";
import { ref, set, serverTimestamp } from "firebase/database";
import { db } from "../lib/firebase";

export default function CreateGroup({ nickname, language, profile }) {
  const navigate = useNavigate();

  function generateRoomCode(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
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

    navigate(`/room/${roomCode}`);
  }

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
              Create Group
            </h2>
            <div className="h-[3px] w-28 mt-2 bg-[#7BFF6C] shadow-[0_0_10px_#7BFF6C]" />
          </div>

          {/* player summary */}
          <div className="font-goldman space-y-6">
            <div className="border border-[#7BFF6C]/30 rounded-xl bg-[#7BFF6C]/5 p-5 shadow-[0_0_20px_rgba(123,255,108,0.08)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-[#7BFF6C] bg-black flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(123,255,108,0.25)]">
                  {profile}
                </div>

                <div className="flex flex-col">
                  <span className="text-[#7BFF6C] uppercase tracking-[0.2em] text-xs">
                    Host Profile
                  </span>
                  <span className="text-white text-lg font-bold">
                    {nickname || "Unknown Player"}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm tracking-wide">
                <div className="flex justify-between border-b border-[#7BFF6C]/10 pb-2">
                  <span className="text-[#7BFF6C] uppercase">Nickname</span>
                  <span className="text-white">{nickname || "—"}</span>
                </div>

                <div className="flex justify-between border-b border-[#7BFF6C]/10 pb-2">
                  <span className="text-[#7BFF6C] uppercase">Language</span>
                  <span className="text-white capitalize">{language || "—"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7BFF6C] uppercase">Avatar</span>
                  <span className="text-white text-xl leading-none">{profile}</span>
                </div>
              </div>
            </div>

            {/* action */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={createGroup}
                className="group relative px-10 py-4 border-2 border-[#7BFF6C] text-[#7BFF6C] font-goldman font-extrabold uppercase tracking-[0.2em] hover:bg-[#7BFF6C] hover:text-black hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(123,255,108,0.12)]"
              >
                Launch Group
                <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#7BFF6C]" />
                <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#7BFF6C]" />
              </button>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="bg-[#7BFF6C]/5 py-3 px-8 flex justify-between items-center border-t border-[#7BFF6C]/10">
          <span className="text-[10px] font-mono tracking-tighter text-[#7BFF6C]/40">
            v1.0.0 // GROUP_CREATION
          </span>
          <div className="flex gap-1.5 items-center">
            <span className="text-[9px] font-goldman tracking-tight text-[#7BFF6C]">
              ROOM_INIT
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