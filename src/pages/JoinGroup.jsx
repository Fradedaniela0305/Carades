import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ref, onValue, set, get } from "firebase/database"
import { db } from "../lib/firebase"
import { useTheme } from "../context/ThemeContext"

export default function JoinGroup({ playerName, playerLanguage, playerProfile, roomId, setRoomId }) {
  const [rooms, setRooms] = useState([])
  const [roomCode, setRoomCode] = useState("")
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()

  // Styling palette from PopUp
  const colors = {
    bg: isDarkMode ? "bg-black" : "bg-slate-50",
    overlay: isDarkMode ? "bg-black/95" : "bg-slate-500/30",
    textMain: isDarkMode ? "text-white" : "text-slate-950",
    border: isDarkMode ? "border-[#7BFF6C]" : "border-[#39A132]",
    footer: isDarkMode ? "bg-[#7BFF6C]/5" : "bg-slate-200/60",
    accentText: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
    accentBg: isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]",
    input: isDarkMode ? "bg-white/5 border-[#7BFF6C]/30 text-white" : "bg-slate-100 border-slate-300 text-slate-900"
  }

  useEffect(() => {
    const roomsRef = ref(db, "rooms")
    const unsubscribe = onValue(roomsRef, snapshot => {
      const data = snapshot.val()
      if (!data) {
        setRooms([])
        return
      }
      const roomList = Object.entries(data).map(([roomId, room]) => ({
        id: roomId,
        language: room.language,
        playerCount: room.players ? Object.keys(room.players).length : 0,
        roundActive: room.roundActive
      }))
      setRooms(roomList)
    })
    return () => unsubscribe()
  }, [])

  const filteredRooms = rooms.filter(room => room.language === playerLanguage)

  async function joinRoom(roomId) {
    const playerId = crypto.randomUUID()
    await set(ref(db, `rooms/${roomId}/players/${playerId}`), {
      name: playerName,
      score: 0,
      language: playerLanguage,
      profile: playerProfile
    })
    navigate(`/rooms/${roomId}/popup`)
    setRoomId(roomId)
  }

  async function joinByCode() {
    if (!roomCode) return
    const roomRef = ref(db, `rooms/${roomCode}`)
    const snapshot = await get(roomRef)
    if (!snapshot.exists()) {
      alert("Room not found")
      return
    }
    const playerId = crypto.randomUUID()
    await set(ref(db, `rooms/${roomCode}/players/${playerId}`), {
      name: playerName,
      score: 0,
      language: playerLanguage,
      profile: playerProfile
    })
    setRoomId(roomCode)
    navigate(`/room/${roomCode}`)
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${colors.overlay} backdrop-blur-md z-50 p-4`}>
      <div className={`relative w-full max-w-[520px] ${colors.bg} border-2 ${colors.border} rounded-2xl shadow-xl overflow-hidden transition-all duration-300`}>
        
        {/* Top Scan Line */}
        <div className="h-1 w-full bg-[#7BFF6C]/10 relative overflow-hidden">
          <div className={`absolute inset-0 w-1/3 animate-[scan_2s_linear_infinite] ${colors.accentBg}`} />
        </div>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col">
              <h2 className={`font-goldman text-3xl ${colors.textMain} tracking-widest uppercase italic font-bold`}>
                JOIN_GAME
              </h2>
              <div className={`h-[3px] w-20 mt-1 shadow-[0_0_10px_#7BFF6C] ${colors.accentBg}`} />
              <p className={`mt-3 font-mono text-[10px] uppercase tracking-tighter ${colors.accentText}`}>
                FILTER: {playerLanguage} // STATUS: SEARCHING...
              </p>
            </div>
            
            <Link to='/dashboard' className={`font-goldman text-xs ${isDarkMode ? 'text-[#7BFF6C]/60 hover:text-[#7BFF6C]' : 'text-slate-400 hover:text-red-500'} transition-colors`}>
              [ BACK ]
            </Link>
          </div>

          {/* Join by code section */}
          <div className="mb-10">
            <div className="flex gap-2 p-1 border border-dashed border-[#7BFF6C]/30 rounded-lg">
              <input
                className={`flex-1 font-mono p-3 rounded-md outline-none text-sm ${colors.input}`}
                placeholder="ENTER_ROOM_CODE..."
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              />
              <button
                className={`px-6 font-goldman font-bold text-xs tracking-widest transition-all active:scale-95 ${isDarkMode ? "bg-[#7BFF6C] text-black hover:bg-[#5cdb4f]" : "bg-[#39A132] text-white hover:bg-slate-900"}`}
                onClick={joinByCode}
              >
                CONNECT
              </button>
            </div>
          </div>

          {/* Available Rooms List */}
          <div className="space-y-4">
            <h3 className={`font-goldman text-sm tracking-[0.2em] mb-4 ${colors.accentText}`}>AVAILABLE_SERVERS</h3>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {filteredRooms.length === 0 ? (
                <div className={`border border-dashed ${colors.border} opacity-50 p-6 rounded-xl text-center font-mono text-sm ${colors.textMain}`}>
                  NO_ACTIVE_ROOMS_FOUND
                </div>
              ) : (
                filteredRooms.map(room => (
                  <button
                    key={room.id}
                    onClick={() => joinRoom(room.id)}
                    className={`group w-full border-l-4 ${colors.border} ${isDarkMode ? 'bg-white/5 hover:bg-[#7BFF6C]/10' : 'bg-slate-200/40 hover:bg-slate-200'} p-4 flex justify-between items-center transition-all`}
                  >
                    <div className="text-left">
                      <span className={`block font-goldman text-lg ${colors.textMain}`}>ROOM_{room.id}</span>
                      <span className={`text-[10px] font-mono ${colors.accentText}`}>SECURE_CONNECTION_STABLE</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`font-goldman text-sm ${colors.textMain}`}>{room.playerCount}/8</span>
                      <span className="text-[9px] font-mono opacity-50 uppercase italic">Players</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className={`${colors.footer} py-3 px-8 flex justify-between items-center border-t ${isDarkMode ? 'border-[#7BFF6C]/10' : 'border-slate-200'}`}>
          <span className={`text-[10px] font-mono tracking-tighter ${isDarkMode ? "text-[#7BFF6C]/40" : "text-slate-500"}`}>
            NET_SCANNER_v2.0 // {playerLanguage.toUpperCase()}
          </span>
          <div className="flex gap-1.5 items-center">
            <span className={`text-[9px] font-goldman tracking-tight ${colors.accentText}`}>PING: 24MS</span>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${colors.accentBg}`} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#7BFF6C33' : '#39A13233'};
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}