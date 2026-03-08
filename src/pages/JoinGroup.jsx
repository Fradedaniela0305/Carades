import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ref, onValue, set, get } from "firebase/database"
import { db } from "../lib/firebase"

export default function JoinGroup({ playerName }) {

    const [rooms, setRooms] = useState([])
    const [roomCode, setRoomCode] = useState("")
    const navigate = useNavigate()

    useEffect(() => {

        const roomsRef = ref(db, "rooms")

        onValue(roomsRef, snapshot => {

            const data = snapshot.val()

            // Uncomment after adding full navigation/routing
            //   if (!playerName) {
            //     navigate("/")
            //   }

            if (!data) {
                setRooms([])
                return
            }

            const roomList = Object.entries(data).map(([id, room]) => ({
                id,
                playerCount: room.players ? Object.keys(room.players).length : 0
            }))

            setRooms(roomList)

        })

    }, [])

    async function joinRoom(roomId) {

        const playerId = crypto.randomUUID()

        await set(ref(db, `rooms/${roomId}/players/${playerId}`), {
            name: playerName,
            score: 0
        })

        navigate(`/room/${roomId}`)
    }

    async function joinByCode() {

        if (!roomCode) return

        const roomRef = ref(db, `rooms/${roomCode}`)
        const snapshot = await get(roomRef)

        if (!snapshot.exists()) {
            alert("Room does not exist")
            return
        }

        const playerId = crypto.randomUUID()

        await set(ref(db, `rooms/${roomCode}/players/${playerId}`), {
            name: playerName,
            score: 0
        })

        navigate(`/room/${roomCode}`)
    }

    return (

        <div className="p-10 flex flex-col gap-6 max-w-lg">

            <h1 className="text-2xl font-bold">
                Join a Game
            </h1>

            {/* Join by room code */}

            <div className="flex gap-2">

                <input
                    className="border p-2 flex-1"
                    placeholder="Enter room code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                />

                <button
                    className="bg-blue-500 text-white px-4 rounded"
                    onClick={joinByCode}
                >
                    Join
                </button>

            </div>


            {/* Public rooms list */}

            <div className="flex flex-col gap-2">

                <h2 className="text-xl font-semibold">
                    Public Rooms
                </h2>

                {rooms.length === 0 && (
                    <p>No active rooms</p>
                )}

                {rooms.map(room => (

                    <button
                        key={room.id}
                        className="border p-3 rounded flex justify-between hover:bg-gray-100"
                        onClick={() => joinRoom(room.id)}
                    >

                        <span>Room {room.id}</span>

                        <span>{room.playerCount} players</span>

                    </button>

                ))}

            </div>

        </div>

    )
}