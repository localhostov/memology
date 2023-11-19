import { IGameParticipant } from "@types"
import { createEvent, createStore } from "effector"
import { disconnectWs } from "./websocket"

export namespace GamesEffects {
    export namespace History {
        export const $users = createStore<IGameParticipant[]>([])
        $users.reset(disconnectWs)
        export const addUser = createEvent<IGameParticipant[]>()

        $users.on(addUser, (current, users) => current.concat(users))

        export const $isStarted = createStore<boolean>(false)
        export const setStart = createEvent<boolean>()

        $isStarted.on(setStart, (_, value) => value)
        $isStarted.reset(disconnectWs)

        export const $time = createStore<number | null>(null)
        export const setTime = createEvent<number | null>()
        $time.on(setTime, (_, time) => time)
        $time.on(setStart, (_, isStarted) => (isStarted ? 15 : null))

        export const $historyStep = createStore<number>(1)
        export const nextStep = createEvent()
        $historyStep.on(nextStep, (step) => step + 1)
    }
}
