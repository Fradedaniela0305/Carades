import { useState, useEffect, useRef } from "react"
import { ref, push, onValue, serverTimestamp } from "firebase/database"
import { db } from "../lib/firebase"
import { useTheme } from "../context/ThemeContext"

export default function TalkChat({ roomID, playerID, players }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const { isDarkMode } = useTheme()
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!roomID) return
    const chatRef = ref(db, `rooms/${roomID}/messages`)
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const msgList = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }))
        setMessages(msgList)
      }
    })
    return () => unsubscribe()
  }, [roomID])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const chatRef = ref(db, `rooms/${roomID}/messages`)
    await push(chatRef, {
      text: newMessage,
      senderID: playerID,
      senderName: players[playerID]?.name || "Anonymous",
      timestamp: serverTimestamp(),
    })
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full w-full max-w-xs border-r border-[#7BFF6C]/20 pr-4">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-hide"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="text-[11px] leading-tight">
            <span className={`font-bold ${msg.senderID === playerID ? (isDarkMode ? 'text-[#7BFF6C]' : 'text-[#39A132]') : 'text-slate-400'}`}>
              {msg.senderName}: 
            </span>
            <span className={`ml-1 ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="relative">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="COMM_LINK..."
          className={`w-full bg-transparent border-b font-goldman text-[10px] py-1 outline-none transition-all ${
            isDarkMode ? "border-[#7BFF6C]/30 focus:border-[#7BFF6C] text-[#7BFF6C]" : "border-slate-300 focus:border-[#39A132]"
          }`}
        />
      </form>
    </div>
  )
}