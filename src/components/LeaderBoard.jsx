export default function Leaderboard({ players = {}, currentCoder }) {

    const playerArray = Object.entries(players).map(([id, player]) => ({
      id,
      ...player
    }))
  
    const sortedPlayers = playerArray.sort((a, b) => b.score - a.score)
  
    return (
      <div className="p-4 border rounded w-full">
  
        <h2 className="text-xl font-bold mb-3">
          Leaderboard
        </h2>
  
        <ul className="flex flex-col">
  
          {sortedPlayers.map((player) => {
  
            const isCoder = player.id === currentCoder
  
            const ringColor = isCoder
              ? ""
              : "border-gray-400 text-gray-400"
  
            return (
              <li
                key={player.id}
                className="flex justify-between items-center border-b border-gray-400/40 py-2"
              >
  
                <div className="flex items-center gap-3">
  
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-lg border-2 ${ringColor}`}
                  >
                    {player.profile}
                  </div>
  
                  {/* Name */}
                  <span className={`transition-all ${ringColor}`}>
                    {player.name} {isCoder && "🖊️"}
                  </span>
  
                </div>
  
                {/* Score */}
                <span className="font-bold">
                  {player.score}
                </span>
  
              </li>
            )
  
          })}
  
        </ul>
  
      </div>
    )
  }