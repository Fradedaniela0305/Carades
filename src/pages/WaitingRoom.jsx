import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ref, onValue, update } from "firebase/database"
import { db } from "../lib/firebase"
import { useTheme } from "../context/ThemeContext"

export default function WaitingRoom() {
    const { roomID } = useParams()
    const navigate = useNavigate()
    const { isDarkMode } = useTheme()

    const [room, setRoom] = useState(null)
    const [players, setPlayers] = useState({})

    const playerID = localStorage.getItem("playerID")

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
    }

    useEffect(() => {
        const roomRef = ref(db, `rooms/${roomID}`)

        const unsubscribe = onValue(roomRef, (snapshot) => {
            const data = snapshot.val()
            if (!data) return

            setRoom(data)
            setPlayers(data.players || {})

            if (data.gameStarted) {
                navigate(`/rooms/${roomID}/popup`)
            }
        })

        return () => unsubscribe()
    }, [roomID, navigate])

    const playerList = useMemo(() => Object.entries(players), [players])

    const isHost = playerID === room?.hostId

    const canStart = isHost && playerList.length > 1

    async function startGame() {
        if (!canStart) return

        await update(ref(db, `rooms/${roomID}`), {
            gameStarted: true
        })
    }

    if (!room) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${colors.pageBg} ${colors.accentText}`}>
                LOADING_WAITING_ROOM...
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${colors.pageBg} flex items-center justify-center p-8`}>
            <div className={`relative w-full max-w-7xl ${colors.bg} border-2 ${colors.border} rounded-3xl shadow-xl overflow-hidden`}>
                <div className={`h-1.5 w-full ${isDarkMode ? "bg-[#7BFF6C]/10" : "bg-slate-200"} relative overflow-hidden`}>
                    <div className={`absolute inset-0 w-1/3 animate-[scan_2s_linear_infinite] ${colors.accentBg}`} />
                </div>

                <div className="p-12">
                    <h1 className={`font-goldman text-5xl uppercase tracking-widest mb-3 ${colors.textMain}`}>
                        Waiting Room
                    </h1>

                    <p className={`font-goldman text-lg mb-8 ${colors.accentText}`}>
                        ROOM CODE: {roomID}
                    </p>

                    <div className={`border rounded-2xl p-8 ${colors.card}`}>
                        <h2 className={`font-goldman text-2xl mb-6 ${colors.accentText}`}>
                            Connected Players
                        </h2>

                        <div className="space-y-4">
                            {playerList.map(([id, player]) => (
                                <div
                                    key={id}
                                    className={`flex items-center justify-between border rounded-xl px-6 py-5 ${isDarkMode ? "border-[#7BFF6C]/20" : "border-slate-200"}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 text-2xl rounded-full flex items-center justify-center border ${colors.border}`}>
                                            {player.profile}
                                        </div>

                                        <div>
                                            <div className={`font-goldman text-xl ${colors.textMain}`}>
                                                {player.name}
                                            </div>
                                            <div className={`text-sm ${colors.accentText}`}>
                                                {id === room.hostId ? "HOST" : "PLAYER"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${colors.textMain} text-lg`}>
                                        Score: {player.score ?? 0}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center md:justify-start">
                        <button
                            onClick={startGame}
                            disabled={!canStart}
                            className={`group relative px-14 py-5 border-2 text-lg font-goldman font-extrabold uppercase tracking-[0.2em] transition-all active:scale-95 ${
                                canStart
                                    ? colors.button
                                    : "border-gray-500 text-gray-500 opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Start Game
                        </button>
                    </div>

                    <p className={`mt-4 text-base ${colors.accentText}`}>
                        {isHost
                            ? playerList.length > 1
                                ? "Enough players connected."
                                : "Need at least 2 players to start."
                            : "Only the host can start the game."}
                    </p>
                </div>

                <div className={`${colors.footer} py-4 px-10 flex justify-between items-center border-t ${isDarkMode ? "border-[#7BFF6C]/10" : "border-slate-200"}`}>
                    <span className={`text-xs font-mono tracking-tighter ${isDarkMode ? "text-[#7BFF6C]/40" : "text-slate-500"}`}>
                        v1.0.0 // STATUS: WAITING_FOR_PLAYERS
                    </span>
                    <div className="flex gap-2 items-center">
                        <span className={`text-xs font-goldman tracking-tight ${colors.accentText}`}>
                            LOBBY_ACTIVE
                        </span>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${colors.accentBg}`} />
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
    )
}