import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Game from './pages/Game.jsx'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Game />
        </>
    )
}

export default App
