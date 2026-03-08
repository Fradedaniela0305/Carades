import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ref, onValue, update } from "firebase/database"
import { db } from "../lib/firebase"
import { concepts } from "../data/words"
import { useTheme } from "../context/ThemeContext"

import Leaderboard from "../components/LeaderBoard"
import CodeEditor from "../components/CodeEditor"
import AnswerBox from "../components/AnswerBox"

export default function Game() {
  const { roomID } = useParams()
  const { isDarkMode } = useTheme()

  const [room, setRoom] = useState(null)
  const [players, setPlayers] = useState({})
  const [currentCoder, setCurrentCoder] = useState("")

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
    // If currentCoder isn't set yet, default to the first player
    if (index === -1) return ids[0]
    const nextIndex = (index + 1) % ids.length
    return ids[nextIndex]
  }

  function startRound(players, currentCoder) {
    if (!players || Object.keys(players).length === 0) return

    const randomConcept = concepts[Math.floor(Math.random() * concepts.length)]
    const nextCoder = getNextCoder(players, currentCoder)

    // Push the concept data to Firebase
    update(ref(db, `rooms/${roomID}`), {
      concept: randomConcept.word,
      hints: randomConcept.hints,
      category: randomConcept.category,
      roundActive: true,
      currentCoder: nextCoder
    })
  }

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomID}`)

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) return

      setRoom(data)
      setPlayers(data.players || {})
      setCurrentCoder(data.currentCoder)

      // FIX: Check if round is inactive. 
      // If we have players and the round isn't active, the current coder pushes a new concept.
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

  if (!room) {
    return (
      <div className={`h-screen w-screen flex items-center justify-center font-goldman ${colors.bg} ${colors.accent}`}>
        INITIALIZING_SESSION...
      </div>
    )
  }

  return (
    <div className={`h-screen w-screen grid grid-cols-[320px_1fr] grid-rows-[1fr_140px] gap-4 p-4 ${colors.bg} transition-colors duration-300`}>
      
      {/* Leaderboard - Width increased to 320px to prevent scrolling */}
      <div className={`row-span-2 border-2 ${colors.border} rounded-2xl ${colors.card} backdrop-blur-sm p-4 overflow-y-auto relative shadow-xl`}>
        
        <div className={`${colors.accent}`}>
        <Leaderboard players={players}/>
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
            concept={room.concept}
            isCoder={playerID === currentCoder}
          />
        </div>
      </div>

      {/* Guessing / Answer Interface */}
      <div className={`border-2 ${colors.border} rounded-2xl ${colors.card} backdrop-blur-sm p-4 flex items-center shadow-lg relative`}>
        <AnswerBox
          roomID={roomID}
          concept={room.concept}
          players={players}
          playerID={playerID}
        />
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}