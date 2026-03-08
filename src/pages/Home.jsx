import { Link } from "react-router-dom"

function Home() {

    return (
        <div style={{ padding: "40px" }}>

            <h1>Dev Navigation</h1>
            <p>Use this page to test components</p>

            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>

                <Link to="/login">
                    <button>Login Page</button>
                </Link>

                <Link to="/game">
                    <button>Game Page</button>
                </Link>

                <Link to="/leaderboard">
                    <button>Leaderboard</button>
                </Link>

                <Link to="/chat">
                    <button>Guess Chat</button>
                </Link>

                <Link to="/editor">
                    <button>Code Editor</button>
                </Link>

                <Link to="/popup">
                    <button>Pop Up</button>
                </Link>

                <Link to="/joinroom">
                    <button>Join Room</button>
                </Link>

                <Link to="/createroom">
                    <button>Create Room</button>
                </Link>

            </div>

        </div>
    )
}

export default Home