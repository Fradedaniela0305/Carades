import { useState } from "react"
import Editor from "@monaco-editor/react"

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
        className="border p-2 rounded w-40"
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

      <Editor
        height="250px"
        width="50vw"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14
        }}
      />

    </div>
  )
}