import { useState } from "react"
import { ref, update, push, serverTimestamp } from "firebase/database"
import { db } from "../lib/firebase"
import { useTheme } from "../context/ThemeContext"

export default function AnswerBox({ roomID, concept, playerID, players, currentCoder, isCoder}) {
  const [answer, setAnswer] = useState("")
  const { isDarkMode } = useTheme()

  async function submitAnswer() {
    if (playerID == currentCoder) return

    const cleanedAnswer = answer.trim().toLowerCase()
    const cleanedConcept = concept?.trim().toLowerCase()

    if (!cleanedAnswer || !playerID || !roomID || !cleanedConcept || !players[playerID]) {
      return
    }

    if (cleanedAnswer === cleanedConcept) {
      const currentScore = players[playerID]?.score || 0
      const coderScore = players[currentCoder]?.score || 0
      
      try {
        // Update scores
        await update(ref(db, `rooms/${roomID}/players/${playerID}`), {
          score: currentScore + 3
        })
        await update(ref(db, `rooms/${roomID}/players/${currentCoder}`), {
          score: coderScore + 1
        })

        // PUSH SYSTEM NOTIFICATION TO CHAT
        await push(ref(db, `rooms/${roomID}/messages`), {
          text: `${players[playerID]?.name} guessed the word! (+3 pts)`,
          type: "notification", // Special type for styling
          timestamp: serverTimestamp()
        })

      } catch (error) {
        console.error("Failed to update score:", error)
      }
    }
    setAnswer("")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") submitAnswer()
  }

  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-2">
        <label className={`font-goldman text-[10px] tracking-[0.2em] uppercase ${isDarkMode ? 'text-[#7BFF6C]' : 'text-[#39A132]'}`}>
          {isCoder ? "TRANSMITTING_CLUE" : "Terminal_Input"}
        </label>
        
        <div className="relative group">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isCoder}
            placeholder={isCoder ? "YOU_ARE_THE_CODER" : "TYPE_GUESS_HERE..."}
            className={`w-full font-goldman text-sm md:text-base px-4 py-3 border-2 rounded-lg outline-none transition-all duration-300 ${
              isCoder 
                ? "opacity-50 cursor-not-allowed border-gray-500 text-gray-500" 
                : isDarkMode
                  ? "bg-black text-[#7BFF6C] border-[#7BFF6C]/30 focus:border-[#7BFF6C] focus:shadow-[0_0_15px_rgba(123,255,108,0.2)] placeholder:text-[#7BFF6C]/30"
                  : "bg-slate-100 text-slate-900 border-slate-300 focus:border-[#39A132] placeholder:text-slate-400"
            }`}
          />
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
            isCoder ? "bg-gray-500" : (isDarkMode ? "bg-[#7BFF6C] animate-pulse" : "bg-[#39A132] animate-pulse")
          }`} />
        </div>
      </div>
    </div>
  )
}