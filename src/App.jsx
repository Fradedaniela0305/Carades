import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Game from "./pages/Game"

import Leaderboard from "./components/Leaderboard"
import GuessChat from "./components/GuessChat"
import CodeEditor from "./components/CodeEditor"
import PopUp from "./pages/PopUp"

function App() {
    const [nickname, setNickname] = useState("");
    const [language, setLanguage] = useState("");
    const [profile, setProfile] = useState("🐱");

    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login
                nickname={nickname}
                setNickname={setNickname}
                language={language}
                setLanguage={setLanguage}
                profile={profile}
                setProfile={setProfile} />} />

            <Route path="/game" element={<Game />} />

            <Route path="/leaderboard" element={<Leaderboard />} />

            <Route path="/chat" element={<GuessChat />} />

            <Route path="/editor" element={<CodeEditor />} />

            <Route path="/popup" element={<PopUp />} />

        </Routes>
    )
}

export default App