// Minimal code for leaderboard: NEED TESTS 
export default function Leaderboard({ players }) {

    const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  
    return (
      <div className="p-4 border rounded w-64">
  
        <h2 className="text-xl font-bold mb-3">
          Leaderboard
        </h2>
  
        <ul className="flex flex-col gap-2">
  
          {sortedPlayers.map((player, index) => (
            <li
              key={player.name}
              className="flex justify-between border-b pb-1"
            >
  
              <span>
                {index + 1}. {player.name}
              </span>
  
              <span className="font-bold">
                {player.score}
              </span>
  
            </li>
          ))}
  
        </ul>
  
      </div>
    )
  }