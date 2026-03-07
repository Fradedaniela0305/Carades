import { useState } from "react";
import ProfilePicker from "../components/ProfilePicker";

export default function Login({
  nickname,
  setNickname,
  language,
  setLanguage,
  profile,
  setProfile,
}) {

    return (
        <>
            <div>
                <ProfilePicker profile={profile} setProfile={setProfile} />
                <div>
                    <h4>nickname</h4>
                    <input className="bg-white text-black border border-gray-300 rounded px-3 py-2 w-64"
                        value={nickname} onChange={(e) => setNickname(e.target.value)} />
                    <h4>languages</h4>
                    <select className="bg-white text-black border border-gray-300 rounded px-3 py-2 w-64"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)} >
                        <option value="english">English</option>
                        <option value="spansih">Spanish</option>
                        <option value="chinese">Chinese</option>
                    </select>
                </div>
                <div>
                    <button>Join Group</button>
                    <button>Create Group</button>
                </div>
            </div>
        </>
    )

}