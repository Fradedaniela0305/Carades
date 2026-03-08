import { useTheme } from "../context/ThemeContext"

export default function Leaderboard({ players = {}, currentCoder }) {
    const { isDarkMode } = useTheme()

    // Dynamic colors following your existing theme pattern
    const colors = {
        text: isDarkMode ? "text-white" : "text-slate-900",
        accent: isDarkMode ? "text-[#7BFF6C]" : "text-[#39A132]",
        border: isDarkMode ? "border-[#7BFF6C]/30" : "border-slate-300",
        muted: isDarkMode ? "text-slate-400" : "text-slate-500"
    }

    const playerArray = Object.entries(players).map(([id, player]) => ({
        id,
        ...player
    }))

    const sortedPlayers = playerArray.sort((a, b) => b.score - a.score)

    return (
        <div className={`p-2 w-full font-goldman ${colors.text}`}>
            <h2 className={`text-xl font-bold mb-6 tracking-widest uppercase ${colors.accent}`}>
                Leaderboard
            </h2>

            <ul className="flex flex-col gap-2">
                {sortedPlayers.map((player) => {
                    const isCoder = player.id === currentCoder

                    return (
                        <li
                            key={player.id}
                            className={`flex justify-between items-center border-b ${colors.border} py-3 transition-colors`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 overflow-hidden shadow-sm ${isCoder
                                        ? (isDarkMode ? "border-[#7BFF6C] bg-[#7BFF6C]/10" : "border-[#39A132] bg-[#39A132]/10")
                                        : colors.border
                                        }`}
                                >
                                    <img
                                        src={player.profile}
                                        alt={`${player.name} avatar`}
                                        className="w-[80%] h-[80%] object-contain"
                                        style={{ transform: "translateX(2px)" }}
                                        draggable="false"
                                    />
                                </div>

                                {/* Name */}
                                <div className="flex flex-col">
                                    <span className={`text-sm font-bold uppercase tracking-tight ${isCoder ? colors.accent : colors.text}`}>
                                        {player.name}
                                    </span>
                                    {isCoder && (
                                        <span className="text-[9px] text-yellow-500 font-black animate-pulse">
                                            [ TRANSMITTING ]
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Score */}
                            <div className="text-right">
                                <span className={`text-xl font-mono font-bold ${colors.accent}`}>
                                    {player.score.toString().padStart(3, '0')}
                                </span>
                                <div className={`text-[8px] uppercase opacity-50 ${colors.text}`}>PTS</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}