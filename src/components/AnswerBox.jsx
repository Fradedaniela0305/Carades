import { useState } from "react"
import { ref, update } from "firebase/database"
import { db } from "../lib/firebase"

export default function AnswerBox({ roomID, concept, playerID, players }) {
  const [answer, setAnswer] = useState("")

  async function submitAnswer() {
    const cleanedAnswer = answer.trim().toLowerCase()
    const cleanedConcept = concept?.trim().toLowerCase()

    if (!cleanedAnswer) return

    if (!playerID) {
      console.error("Missing playerID in AnswerBox")
      return
    }

    if (!roomID) {
      console.error("Missing roomID in AnswerBox")
      return
    }

    if (!cleanedConcept) {
      console.error("Missing concept in AnswerBox")
      return
    }

    if (!players[playerID]) {
      console.error("Player not found in players object", {
        playerID,
        players
      })
      return
    }

    if (cleanedAnswer === cleanedConcept) {
      const currentScore = players[playerID]?.score || 0

      try {
        await update(ref(db, `rooms/${roomID}/players/${playerID}`), {
          score: currentScore + 1
        })

        alert("Correct!")
      } catch (error) {
        console.error("Failed to update score:", error)
      }
    }

    setAnswer("")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submitAnswer()
    }
  }

  return (
    <div className="p-4">
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your guess and press Enter..."
        className="border p-2 w-full"
      />
    </div>
  )
}