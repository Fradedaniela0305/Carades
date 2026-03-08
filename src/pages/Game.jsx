import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ref, onValue, update } from "firebase/database"
import { db } from "../lib/firebase"
import { concepts } from "../data/words"

import Leaderboard from "../components/LeaderBoard"
import CodeEditor from "../components/CodeEditor"
import AnswerBox from "../components/AnswerBox"

export default function Game() {

  const { roomID } = useParams()

  const [room, setRoom] = useState(null)
  const [players, setPlayers] = useState({})
  const [currentCoder, setCurrentCoder] = useState("")

  const playerID = localStorage.getItem("playerID")

  function getNextCoder(players, currentCoder) {
    const ids = Object.keys(players)

    if (ids.length === 0) return null

    const index = ids.indexOf(currentCoder)

    const nextIndex = (index + 1) % ids.length

    return ids[nextIndex]
  }

  function startRound(players, currentCoder) {

    if (!players || Object.keys(players).length === 0) return

    const randomConcept =
    concepts[Math.floor(Math.random() * concepts.length)]

    const nextCoder = getNextCoder(players, currentCoder)

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

      // start new round if none active
      if (
        !data.roundActive &&
        !data.concept &&
        playerID === data.currentCoder
      ) {
        startRound(data.players, data.currentCoder)
      }

    })

    return () => unsubscribe()

  }, [roomID])

  if (!room) {
    return <div className="text-white p-10">Loading...</div>
  }

  return (
    <div className="h-screen w-screen grid grid-cols-[260px_1fr] grid-rows-[1fr_120px] gap-4 p-4 bg-black text-white">

      {/* Leaderboard */}
      <div className="row-span-2 border rounded p-3 overflow-y-auto">
        <Leaderboard players={players} />
      </div>

      {/* Code editor */}
      <div className="border rounded p-3 overflow-hidden">
        <CodeEditor
          concept={room.concept}
          isCoder={playerID === currentCoder}
        />
      </div>

      {/* Guess box */}
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