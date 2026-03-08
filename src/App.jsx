import { Routes, Route } from "react-router-dom"
import { useState } from "react";

// Context & Global Components
import { ThemeProvider } from "./context/ThemeContext";
import ToggleTheme from "./components/ToggleTheme";

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Game from "./pages/Game"
import PopUp from "./pages/PopUp"

// Components
import LeaderBoard from "./components/LeaderBoard"
import GuessChat from "./components/GuessChat"
import CodeEditor from "./components/CodeEditor"
import JoinGroup from "./pages/JoinGroup";
import CreateGroup from "./pages/CreateGroup";

function App() {
    const [nickname, setNickname] = useState("");
    const [language, setLanguage] = useState("english");
    const [profile, setProfile] = useState("🐱");
    const [roomId, setRoomId] = useState("");

    return (
        <ThemeProvider>
            {/* The toggle is placed here so it persists across all routes */}
            <ToggleTheme />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login
                    nickname={nickname}
                    setNickname={setNickname}
                    language={language}
                    setLanguage={setLanguage}
                    profile={profile}
                    setProfile={setProfile} />} />

                <Route path="/game" element={<Game 
                roomId={roomId}/>} />

                <Route path="/leaderboard" element={<LeaderBoard />} />

                <Route path="/chat" element={<GuessChat />} />

                <Route path="/editor" element={<CodeEditor />} />

                <Route path="/popup" element={<PopUp />} />

                <Route path="/joinroom" element={<JoinGroup 
                    playerName={nickname}
                    playerLanguage={language}
                    playerProfile={profile}
                    roomId={roomId}
                    setRoomId={setRoomId}
                />} />

                <Route path="/createroom" element={<CreateGroup
                    nickname={nickname}
                    language={language}
                    profile={profile}
                    roomId={roomId}
                    setRoomId={setRoomId} />} />
            </Routes>
        </ThemeProvider>
    )
}

export default App;