import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ref, onValue } from "firebase/database"
import { db } from "../lib/firebase"

import Leaderboard from "../components/LeaderBoard"
import CodeEditor from "../components/CodeEditor"
import AnswerBox from "../components/AnswerBox"

export default function Game() {

  const { roomID } = useParams()

  const [room, setRoom] = useState(null)
  const [players, setPlayers] = useState({})

  // MVP: store playerID locally
  const playerID = localStorage.getItem("playerID")

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomID}`)

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val()

      if (!data) return

      setRoom(data)
      setPlayers(data.players || {})
    })

    return () => unsubscribe()
  }, [roomID])

  if (!room) {
    return <div className="text-white p-10">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Leaderboard */}
      <Leaderboard players={players} />

      {/* Code hint editor */}
      <CodeEditor />

      {/* Guess input */}
      <AnswerBox
        roomID={roomID}
        concept={room.concept}
        players={players}
        playerID={playerID}
      />

    </div>
  )
}