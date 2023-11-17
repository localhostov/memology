import { UserInfo } from "@vkontakte/vk-bridge"
import { createEvent, createStore } from "effector"
import { disconnectWs } from "./websocket"

export namespace GamesEffects {
    export namespace History {
        export const $users = createStore<UserInfo[]>([])
        $users.reset(disconnectWs)
        export const addUser = createEvent<UserInfo[]>()

        $users.on(addUser, (current, users) => current.concat(users))
    }
}
