import { IGameParticipant, TGameHistoryStepType, TGameModeType } from "@types"
import bridge from "@vkontakte/vk-bridge"
import {
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from "effector"
import { API } from "../api"
import { APIError, isAPIError } from "../api/APIError"
import {
    WebsocketServer_HistoryEvents_FinishGame_Dialog,
    WebsocketServer_HistoryEvents_SettingsUpdate,
    WebsocketServer_HistoryEvents_UserLeaved,
} from "../proto"
import { disconnectWs } from "./websocket"

function blobToBase64(blob: Blob) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
    }) as Promise<string>
}

interface IGetLobbyParams {
    type: TGameModeType
    roomId: string
}

interface IGifContent {
    dialogId: number
    buffer: Uint8Array
    vkAttachment: string
}

export namespace GamesEffects {
    export const getLobbyInfoFx = createEffect(
        async ({ type, roomId }: IGetLobbyParams) => {
            const room = await API.getRoom(type, roomId)
            const owner = await bridge.send("VKWebAppGetUserInfo", {
                user_id: Number(room.ownerVkId),
            })
            return Object.assign(room, { owner })
        },
    )
    export const $lobbyInfo = restore(getLobbyInfoFx, null)
    export const $lobbyInfoError = createStore<APIError | null>(null)
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
            if (deleteItem.newOwnerVkId)
                current.find(
                    (x) => x.vkId === deleteItem.newOwnerVkId,
                )!.isOwner = true

            //TODO: fix array copy
            return [...current]
        })

        export const setStart = createEvent<boolean>()
        export const $isStarted = restore(setStart, false)
        $isStarted.reset(disconnectWs)

        export const setTime = createEvent<number | null>()
        export const $time = restore(setTime, null)

        export const $historyStep = createStore<number>(1)

        $historyStep.reset($isStarted)
        export const setReadyCount = createEvent<number>()
        export const $readyCounter = restore(setReadyCount, 0)
        $readyCounter.reset($historyStep)
        export const $isReady = createStore(false)
        export const setIsReady = createEvent()
        $isReady.on(setIsReady, (isReady) => !isReady)
        $isReady.reset($historyStep, $isStarted)

        export const nextStep = createEvent<string>()
        $historyStep.on(nextStep, (step) => step + 1)
        export const $previousContext = restore(nextStep, null)
        $previousContext.reset($isStarted)

        export const setMessages =
            createEvent<WebsocketServer_HistoryEvents_FinishGame_Dialog[]>()
        export const $messages = restore(setMessages, null)

        export const $gifContent = createStore<
            {
                dialogId: number
                link: string
                vkAttachment: string
                base64: string
            }[]
        >([])

        export const getContentLinkFx = createEffect(
            async (gif: IGifContent) => ({
                dialogId: gif.dialogId,
                link: URL.createObjectURL(
                    new Blob([gif.buffer], { type: "image/gif" }),
                ),
                vkAttachment: gif.vkAttachment,
                base64: await blobToBase64(
                    new Blob([gif.buffer], { type: "image/gif" }),
                ),
            }),
        )
        $gifContent.on(getContentLinkFx.doneData, (current, newGif) =>
            current.concat(newGif).sort((a, b) => a.dialogId - b.dialogId),
        )
        export const setGifBuffer = createEvent<IGifContent>()
        sample({
            clock: setGifBuffer,
            target: getContentLinkFx,
        })
        $gifContent.on($isStarted, () => [])
        export const setGameStep = createEvent<TGameHistoryStepType>()

        export const $gameStep = restore(setGameStep, "meWrite")
        $gameStep.reset($historyStep)

        //finish game
        export const setChatRoot = createEvent<number>()
        export const $currentChatRoot = restore(setChatRoot, 0)
        $currentChatRoot.reset($isStarted)

        export const setChatAlbumIsShowed = createEvent<boolean>()
        export const $chatAlbumIsShowed = restore(setChatAlbumIsShowed, false)
        $chatAlbumIsShowed.reset($currentChatRoot)

        export const setSettings =
            createEvent<WebsocketServer_HistoryEvents_SettingsUpdate>()
        export const $settings = restore(setSettings, {
            roundTime: 15,
        })

        sample({
            source: $settings,
            clock: [setStart, nextStep],
            fn: ({ roundTime }) => roundTime,
            target: setTime,
        })

        export const $isTTSEnabled = createStore(true)
        export const changeTTSStatus = createEvent()
        $isTTSEnabled.on(changeTTSStatus, (status) => !status)
    }
}
