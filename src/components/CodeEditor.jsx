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

export default function CodeEditor({ roomID, isCoder }) {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(commentMap["javascript"])
  const { isDarkMode } = useTheme()

  // Listen for code changes from Firebase
  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomID}`)
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) return

      if (data.code !== undefined) setCode(data.code)
      if (data.language) setLanguage(data.language)
    })

    return () => unsubscribe()
  }, [roomID])

  function handleLanguageChange(e) {
    const newLang = e.target.value
    setLanguage(newLang)
    setCode(commentMap[newLang])

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
      update(ref(db, `rooms/${roomID}`), {
        code: newCode
      })
    }
  }

  return (
    <div className="mt-22 flex flex-col gap-6">
      {/* Role Status Indicator */}
      <div className="flex items-center gap-2 px-2">
        {isCoder ? (
          <>
            <div className="h-2 w-2 rounded-full bg-[#7BFF6C] animate-pulse shadow-[0_0_8px_#7BFF6C]" />
            <span className="font-goldman text-xs tracking-[0.2em] text-[#7BFF6C] uppercase italic font-bold">
              Role: Coder
            </span>
          </>
        ) : (
          <>
            <div className="h-2 w-2 rounded-full bg-slate-500 shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
            <span className="font-goldman text-xs tracking-[0.2em] text-slate-400 uppercase italic font-bold">
              Role: Spectator
            </span>
          </>
        )}
      </div>
      
      {/* Language Selector */}
      <select
        value={language}
        onChange={handleLanguageChange}
        disabled={!isCoder}
        className={`w-40 border rounded-lg px-3 py-2 outline-none font-goldman transition-all ${
          isDarkMode
            ? "bg-black text-[#7BFF6C] border-[#7BFF6C]/40 focus:border-[#7BFF6C]"
            : "bg-slate-100 text-slate-900 border-slate-300 focus:border-[#39A132]"
        }`}
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
        <option value="ruby">Ruby</option>
        <option value="sql">SQL</option>
      </select>

      {/* Editor Container */}
      <div className={`border-2 rounded-xl overflow-hidden ${
        isDarkMode ? 'border-[#7BFF6C]/30' : 'border-slate-300'
      }`}>
        <Editor
          height="600px"
          width="100%"
          language={language}
          value={code}
          theme={isDarkMode ? "vs-dark" : "light"}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 10 },
            scrollBeyondLastLine: false,
            readOnly: !isCoder
          }}
        />
      </div>
    </div>
  )
}