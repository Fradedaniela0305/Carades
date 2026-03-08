import { useState } from "react"
import { ref, update } from "firebase/database"
import { db } from "../lib/firebase"

export default function AnswerBox({ roomID, concept, playerID, players }) {

    const [answer, setAnswer] = useState("")

    function submitAnswer() {
        if (!answer.trim()) return

        if (answer.trim().toLowerCase() === concept.trim().toLowerCase()) {

            const currentScore = players[playerID]?.score || 0

            update(ref(db, `rooms/${roomID}/players/${playerID}`), {
                score: currentScore + 1
            })

            alert("Correct!")
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