import {
    IGameParticipant,
    ReturnApiType,
    TGameHistoryStepType,
    TGameModeType,
} from "@types"
import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, createStore, sample } from "effector"
import { API } from "../api"
import { APIError, isAPIError } from "../api/APIError"
import {
    WebsocketServer_HistoryEvents_FinishGame_Dialog,
    WebsocketServer_HistoryEvents_UserLeaved,
} from "../proto"
import { disconnectWs } from "./websocket"

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
            if (deleteItem.newOwnerVkId)
                current.find(
                    (x) => x.vkId === deleteItem.newOwnerVkId,
                )!.isOwner = true

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

        $historyStep.reset($isStarted)
        export const $readyCounter = createStore(0)
        export const setReadyCount = createEvent<number>()
        $readyCounter.on(setReadyCount, (_, count) => count)
        $readyCounter.reset($historyStep)
        export const $isReady = createStore(false)
        export const setIsReady = createEvent()
        $isReady.on(setIsReady, (isReady) => !isReady)
        $isReady.reset($historyStep, $isStarted)
        export const $previousContext = createStore<string | null>(null)
        $previousContext.reset($isStarted)
        export const nextStep = createEvent<string>()
        $historyStep.on(nextStep, (step) => step + 1)
        $previousContext.on(nextStep, (_, ctx) => ctx)
        $time.on(nextStep, () => 15)
        export const $messages = createStore<
            WebsocketServer_HistoryEvents_FinishGame_Dialog[] | null
        >(null)
        export const setMessages =
            createEvent<WebsocketServer_HistoryEvents_FinishGame_Dialog[]>()
        $messages.on(setMessages, (_, msgs) => msgs)

        export const $gifContent = createStore<
            {
                dialogId: number
                link: string
                vkAttachment: string
            }[]
        >([])
        export const getContentLinkFx = createEffect((gif: IGifContent) => ({
            dialogId: gif.dialogId,
            link: URL.createObjectURL(
                new Blob([gif.buffer], { type: "image/gif" }),
            ),
            vkAttachment: gif.vkAttachment,
        }))
        $gifContent.on(getContentLinkFx.doneData, (current, newGif) =>
            current.concat(newGif).sort((a, b) => a.dialogId - b.dialogId),
        )
        export const setGifBuffer = createEvent<IGifContent>()
        $gifContent.on($isStarted, () => [])
        export const $gameStep = createStore<TGameHistoryStepType>("meWrite")

        export const setGameStep = createEvent<TGameHistoryStepType>()

        $gameStep.on(setGameStep, (_, currentStep) => currentStep)
        $gameStep.reset($historyStep)
        sample({
            clock: setGifBuffer,
            target: getContentLinkFx,
        })

        export const $currentChatRoot = createStore(0)
        export const setChatRoot = createEvent<number>()
        $currentChatRoot.on(setChatRoot, (_, num) => num)
        $currentChatRoot.reset($isStarted)

        export const $chatAlbumIsShowed = createStore(false)
        export const setChatAlbumIsShowed = createEvent<boolean>()
        $chatAlbumIsShowed.on(setChatAlbumIsShowed, (_, showed) => showed)
        $chatAlbumIsShowed.reset($currentChatRoot)

        export const $callLink = createStore<string | null>(null)
        export const setCallLink = createEvent<string | null>()
        $callLink.on(setCallLink, (_, link) => link)
    }
}
