import { useState } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "../context/ThemeContext" // Added for consistency

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

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(commentMap["javascript"])
  const { isDarkMode } = useTheme() // Check current theme

  function handleLanguageChange(e) {
    const newLang = e.target.value
    setLanguage(newLang)
    setCode(commentMap[newLang])
  }

  return (
    <div className="flex flex-col gap-3">
      <select
        value={language}
        onChange={handleLanguageChange}
        // Updated styling to match your login/create group inputs
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

      <div className={`border-2 rounded-xl overflow-hidden ${isDarkMode ? 'border-[#7BFF6C]/30' : 'border-slate-300'}`}>
        <Editor
          height="250px"
          width="100%"
          language={language}
          value={code}
          // THEME PROP: "vs-dark" for dark mode, "light" for light mode
          theme={isDarkMode ? "vs-dark" : "light"}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 10 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  )
}