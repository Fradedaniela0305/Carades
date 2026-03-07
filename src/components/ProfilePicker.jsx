import { useState } from "react";

export default function ProfilePicker({ profile, setProfile }) {

    const [showCharacters, setShowCharacters] = useState(false);

    const characters = ["🐱", "🐶", "🐸", "🐼", "🦊", "🐰"];

    function handleCharacterClick(character) {
        setProfile(character);
        setShowCharacters(false);
    }

    return (
        <div>
            <button onClick={() => setShowCharacters(!showCharacters)}>
                {profile}
            </button>

            {showCharacters && (
                <div>
                    {characters.map((character) => (
                        <button
                            key={character}
                            onClick={() => handleCharacterClick(character)}
                        >
                            {character}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );






}