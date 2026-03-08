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
    <div className="h-screen w-screen grid grid-cols-[260px_1fr] grid-rows-[1fr_120px] gap-4 p-4 bg-black text-white">
  
      {/* Leaderboard (left side) */}
      <div className="row-span-2 border rounded p-3 overflow-y-auto">
        <Leaderboard players={players} />
      </div>
  
      {/* Code editor (top right) */}
      <div className="border rounded p-3 overflow-hidden">
        <CodeEditor />
      </div>
  
      {/* Guess input (bottom right) */}
      <div className="border rounded p-3 flex items-center">
        <AnswerBox
          roomID={roomID}
          concept={room.concept}
          players={players}
          playerID={playerID}
        />
      </div>
  
    </div>
  
  )
}