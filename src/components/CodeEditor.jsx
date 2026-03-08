import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "../context/ThemeContext"
import { ref, onValue, update } from "firebase/database"
import { db } from "../lib/firebase"

const commentMap = {
  javascript: "// write your code hint here",
  typescript: "// write your code hint here",
  python: "# write your code hint here",
  cpp: "// write your code hint here",
  java: "// write your code hint here",
  csharp: "// write your code hint here",
  go: "// write your code hint here",
  rust: "// write your code hint here",
  ruby: "# write your code hint here",
  sql: "-- write your code hint here"
}

export default function CodeEditor({ roomID, isCoder, ROUND_DURATION }) {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(commentMap["javascript"])
  const { isDarkMode } = useTheme()

  const [gameMeta, setGameMeta] = useState({ category: "", hints: "", startTime: null })
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomID}`)
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) return

      if (data.code !== undefined) setCode(data.code)
      if (data.language) setLanguage(data.language)
      
      setGameMeta({
        category: data.category || "",
        hints: data.hints || "", 
        startTime: data.roundStartTime || null
      })
    })

    return () => unsubscribe()
  }, [roomID])

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameMeta.startTime) {
        const secondsElapsed = Math.floor((Date.now() - gameMeta.startTime) / 1000)
        setElapsed(secondsElapsed)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [gameMeta.startTime])

  const shouldShowCategory = elapsed >= ROUND_DURATION * 1 / 3
  const shouldShowHint = elapsed >= ROUND_DURATION * 2 / 3

  function handleLanguageChange(e) {
    const newLang = e.target.value
    setLanguage(newLang)
    if (isCoder) {
      update(ref(db, `rooms/${roomID}`), {
        language: newLang,
        code: commentMap[newLang]
      })
    }
  }

  function handleCodeChange(value) {
    const newCode = value || ""
    setCode(newCode)
    if (isCoder) {
      update(ref(db, `rooms/${roomID}`), { code: newCode })
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-5 px-4 h-full">
      
      {/* Header with Larger Category */}
      <div className="flex items-center justify-start gap-8 border-b border-[#7BFF6C]/10 pb-4">
        <div className="flex items-center gap-2">
            {isCoder ? (
              <>
                <div className="h-2.5 w-2.5 rounded-full bg-[#7BFF6C] animate-pulse shadow-[0_0_8px_#7BFF6C]" />
                <span className="font-goldman text-sm tracking-[0.2em] text-[#7BFF6C] uppercase italic font-bold">Role: Coder</span>
              </>
            ) : (
              <>
                <div className="h-2.5 w-2.5 rounded-full bg-slate-500 shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
                <span className="font-goldman text-sm tracking-[0.2em] text-slate-400 uppercase italic font-bold">Role: Guesser</span>
              </>
            )}
        </div>

        {/* Enhanced Category Design */}
        {shouldShowCategory && gameMeta.category && (
          <div className="animate-[reveal_0.5s_ease-out] flex items-center gap-3 border-2 border-[#7BFF6C]/40 bg-[#7BFF6C]/10 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(123,255,108,0.1)]">
            <span className="font-goldman text-[10px] text-slate-400 uppercase tracking-widest font-bold">Category</span>
            <span className="font-goldman text-sm text-[#7BFF6C] uppercase tracking-[0.2em] font-black italic">
              {gameMeta.category}
            </span>
          </div>
        )}
      </div>

      {/* Hint section with Revealing Animation */}
      <div className="px-2 min-h-[80px]">
          {shouldShowHint && gameMeta.hints && (
            <div className="flex flex-col gap-2 border border-yellow-500/20 bg-yellow-500/5 p-4 rounded-xl shadow-[inset_0_0_20px_rgba(234,179,8,0.05)]">
              <span className="font-goldman text-[10px] text-yellow-500/80 uppercase tracking-widest font-bold">Terminal Letter Hint</span>
              <div className="font-mono text-2xl tracking-[0.4em] text-yellow-500 px-1 overflow-hidden whitespace-nowrap border-r-2 border-yellow-500 animate-[typing_3.5s_steps(30,end),blink_0.8s_step-end_infinite]">
                {gameMeta.hints}
              </div>
            </div>
          )}
      </div>
      
      <div className="px-2">
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={!isCoder}
            className={`w-44 border-2 rounded-lg px-4 py-2 outline-none font-goldman text-sm transition-all cursor-pointer ${
              isDarkMode
                ? "bg-black text-[#7BFF6C] border-[#7BFF6C]/40 focus:border-[#7BFF6C]"
                : "bg-slate-100 text-slate-900 border-slate-300 focus:border-[#39A132]"
            }`}
          >
            {Object.keys(commentMap).map(lang => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>
      </div>

      {/* Editor Container - Margin Bottom added to clear TimeLeft bar */}
      <div className={`mx-2 mb-16 border-2 rounded-xl overflow-hidden shadow-2xl ${
        isDarkMode ? 'border-[#7BFF6C]/30' : 'border-slate-300'
      }`}>
        <Editor
          height="540px"
          width="100%"
          language={language}
          value={code}
          theme={isDarkMode ? "vs-dark" : "light"}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 15, bottom: 20 },
            scrollBeyondLastLine: false,
            readOnly: !isCoder,
            automaticLayout: true
          }}
        />
      </div>

      <style>{`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: #eab308 }
          }
          @keyframes reveal {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
      `}</style>
    </div>
  )
}