import { db } from "../lib/firebase"
import { ref, set } from "firebase/database"

function Game({roomId}) {
    function testWrite() {

        set(ref(db, "test/message"), {
            text: "its working"
        })

    }
    return (
        <button onClick={testWrite}>
            Test Firebase
        </button>
    )
}

export default Game