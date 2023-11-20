import { IGameParticipant, ReturnApiType, TGameModeType } from "@types"
import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, createStore, sample } from "effector"
import { API } from "../api"
import { APIError, isAPIError } from "../api/APIError"
import { WebsocketServer_HistoryEvents_UserLeaved } from "../proto"
import { disconnectWs } from "./websocket"

interface IGetLobbyParams {
    type: TGameModeType
    roomId: string
}

export namespace GamesEffects {
    export const $lobbyInfo = createStore<ReturnApiType<
        typeof API.getRoom
    > | null>(null)
    export const $lobbyInfoError = createStore<APIError | null>(null)

    export const getLobbyInfoFx = createEffect(
        async ({ type, roomId }: IGetLobbyParams) => {
            const room = await API.getRoom(type, roomId)
            const owner = await bridge.send("VKWebAppGetUserInfo", {
                user_id: Number(room.ownerVkId),
            })
            return Object.assign(room, { owner })
        },
    )
    $lobbyInfo.on(getLobbyInfoFx.doneData, (_, info) => info)
    $lobbyInfoError.on(getLobbyInfoFx.failData, (_, error) => {
        if (isAPIError(error)) return error
        return null
    })
    export const getLobbyInfo = createEvent<IGetLobbyParams>()

    sample({
        source: getLobbyInfo,
        target: getLobbyInfoFx,
    })

    export namespace History {
        export const $users = createStore<IGameParticipant[]>([])
        $users.reset(disconnectWs)
        export const addUser = createEvent<IGameParticipant[]>()

        $users.on(addUser, (current, users) => current.concat(users))

        export const deleteUser =
            createEvent<WebsocketServer_HistoryEvents_UserLeaved>()
        $users.on(deleteUser, (current, deleteItem) => {
            const itemIndex = current.findIndex(
                (x) => x.vkId === deleteItem.vkId,
            )

            if (itemIndex === -1) return current

            current.splice(itemIndex, 1)
            //TODO: fix array copy
            return [...current]
        })
        export const $isStarted = createStore<boolean>(false)
        export const setStart = createEvent<boolean>()

        $isStarted.on(setStart, (_, value) => value)
        $isStarted.reset(disconnectWs)

        export const $time = createStore<number | null>(null)
        export const setTime = createEvent<number | null>()
        $time.on(setTime, (_, time) => time)
        $time.on(setStart, (_, isStarted) => (isStarted ? 15 : null))

        export const $historyStep = createStore<number>(1)
        export const $previousContext = createStore<string | null>(null)
        export const nextStep = createEvent<string>()
        $historyStep.on(nextStep, (step) => step + 1)
        $previousContext.on(nextStep, (_, ctx) => ctx)
        export const $gifContent = createStore<string | null>(null)
        export const getContentLinkFx = createEffect((buffer: Uint8Array) =>
            URL.createObjectURL(new Blob([buffer], { type: "image/gif" })),
        )
        $gifContent.on(getContentLinkFx.doneData, (_, link) => link)
        export const setGifBuffer = createEvent<Uint8Array>()

        sample({
            clock: setGifBuffer,
            target: getContentLinkFx,
        })
    }
}
