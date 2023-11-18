import { IGameParticipant } from "@types"
import { createEvent, createStore } from "effector"
import { disconnectWs } from "./websocket"

export namespace GamesEffects {
    export namespace History {
        export const $users = createStore<IGameParticipant[]>([])
        $users.reset(disconnectWs)
        export const addUser = createEvent<IGameParticipant[]>()

        $users.on(addUser, (current, users) => current.concat(users))
    }
}
