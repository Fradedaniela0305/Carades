import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ref, onValue, update } from "firebase/database"
import { db } from "../lib/firebase"
import { concepts } from "../data/words"
import { useTheme } from "../context/ThemeContext"
import AnswerPopup from "../components/AnswerPopUp"
import Leaderboard from "../components/LeaderBoard"
import CodeEditor from "../components/CodeEditor"
import AnswerBox from "../components/AnswerBox"

export default function Game() {
    const { roomID } = useParams()
    const { isDarkMode } = useTheme()

    const [room, setRoom] = useState(null)
    const [players, setPlayers] = useState({})
    const [currentCoder, setCurrentCoder] = useState("")
    const ROUND_DURATION = 120 // seconds
    const [timeLeft, setTimeLeft] = useState(ROUND_DURATION)

    const [showAnswerPopup, setShowAnswerPopup] = useState(false)
    const [revealedAnswer, setRevealedAnswer] = useState("")

    const playerID = localStorage.getItem("playerID")

    // Theme styling mapping
    const colors = {
        bg: isDarkMode ? "bg-black" : "bg-slate-50",
        card: isDarkMode ? "bg-black/40" : "bg-white",
        border: isDarkMode ? "border-[#7BFF6C]/30" : "border-slate-300",
        accent: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
        accentBg: isDarkMode ? "bg-[#7BFF6C]" : "bg-[#39A132]"
    }

    function getNextCoder(players, currentCoder) {
        const ids = Object.keys(players)
        if (ids.length === 0) return null
        const index = ids.indexOf(currentCoder)
        if (index === -1) return ids[0]
        const nextIndex = (index + 1) % ids.length
        return ids[nextIndex]
    }

function startRound(players, currentCoder) {
    if (!players || Object.keys(players).length === 0) return
    if (!currentCoder) return

    const randomConcept =
        concepts[Math.floor(Math.random() * concepts.length)]

    update(ref(db, `rooms/${roomID}`), {
        concept: randomConcept.word,
        hints: randomConcept.hints,
        category: randomConcept.category,
        roundActive: true,
        currentCoder: currentCoder,
        roundStartTime: Date.now(),
        revealedAnswer: ""
    })
}

    useEffect(() => {
        const roomRef = ref(db, `rooms/${roomID}`)

        const unsubscribe = onValue(roomRef, (snapshot) => {
            const data = snapshot.val()
            if (!data) return

            setRoom(data)

            if (!data.roundActive && data.revealedAnswer) {
    setRevealedAnswer(data.revealedAnswer)
    setShowAnswerPopup(true)
} else {
    setShowAnswerPopup(false)
}
            if (data.roundStartTime) {
                const elapsed = Math.floor((Date.now() - data.roundStartTime) / 1000)
                const remaining = ROUND_DURATION - elapsed
                setTimeLeft(Math.max(remaining, 0))
            } else {
                setTimeLeft(ROUND_DURATION)
            }
            setPlayers(data.players || {})
            setCurrentCoder(data.currentCoder)

            const playerList = Object.keys(data.players || {})
            if (
                playerList.length > 0 &&
                !data.roundActive &&
                playerID === data.currentCoder
            ) {
                startRound(data.players, data.currentCoder)
            }
        })

        return () => unsubscribe()
    }, [roomID, playerID])

    useEffect(() => {
        if (!room?.roundStartTime) return

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - room.roundStartTime) / 1000)
            const remaining = ROUND_DURATION - elapsed
            setTimeLeft(Math.max(remaining, 0))

if (remaining <= 0 && playerID === room.currentCoder) {
    const nextCoder = getNextCoder(players, room.currentCoder)

    update(ref(db, `rooms/${roomID}`), {
        revealedAnswer: room.concept,
        roundActive: false,
        currentCoder: nextCoder
    })
}
        }, 1000)

        return () => clearInterval(interval)
    }, [room, players])

    if (!room) {
        return (
            <div className={`h-screen w-screen flex items-center justify-center font-goldman ${colors.bg} ${colors.accent}`}>
                INITIALIZING_SESSION...
            </div>
        )
    }

    return (
        <div className={`h-screen w-screen grid grid-cols-[320px_1fr] grid-rows-[1fr_140px] gap-4 p-4 ${colors.bg} transition-colors duration-300`}>

            {/* Leaderboard */}
            <div className={`row-span-2 border-2 ${colors.border} rounded-2xl ${colors.card} backdrop-blur-sm p-4 overflow-y-auto relative shadow-xl`}>
                <div className={`${colors.accent}`}>
                    <Leaderboard players={players} currentCoder={currentCoder}/>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${colors.accentBg}`} />
                    <span className={`text-[9px] font-mono uppercase tracking-tighter ${colors.accent}`}>ID: {roomID}</span>
                </div>
            </div>

            {/* Code Editor Area */}
            <div className={`border-2 ${colors.border} rounded-2xl ${colors.card} backdrop-blur-sm overflow-hidden flex flex-col relative`}>
                <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                    <div className={`absolute inset-0 w-1/4 animate-[scan_3s_linear_infinite] ${colors.accentBg}`} />
                </div>

                <div className="flex-1 p-2">
                    <CodeEditor
                        roomID={roomID}
                        isCoder={playerID === currentCoder}
                    />
                </div>

                {/* TIMER DISPLAY - Works for both Light and Dark mode */}
                <div className={`absolute bottom-0 left-0 w-full px-6 py-2 border-t ${colors.border} ${isDarkMode ? 'bg-black/60' : 'bg-white/80'} backdrop-blur-md flex justify-between items-center z-10`}>
                   <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-goldman tracking-[0.2em] opacity-70 ${colors.accent}`}>TIME_LEFT:</span>
                        <span className={`text-xl font-mono font-bold tabular-nums ${timeLeft < 20 ? 'text-red-500 animate-pulse' : colors.accent}`}>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                   </div>
                   
                   <div className={`w-48 h-1 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                        <div 
                            className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 20 ? 'bg-red-500' : colors.accentBg}`}
                            style={{ width: `${(timeLeft / ROUND_DURATION) * 100}%` }}
                        />
                   </div>
                </div>
            </div>

            {/* Guessing / Answer Interface */}
            <div className={`border-2 ${colors.border} rounded-2xl ${colors.card} backdrop-blur-sm p-4 flex items-center shadow-lg relative`}>
                <AnswerBox
                    roomID={roomID}
                    concept={room.concept}
                    players={players}
                    playerID={playerID}
                    currentCoder={currentCoder}
                />
            </div>

            <AnswerPopup isOpen={showAnswerPopup} answer={revealedAnswer} />

            <style>{`
                @keyframes scan {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(400%); }
                }
            `}</style>
        </div>
    )
}