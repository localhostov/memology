import { TGameModeType } from "@types"
import bridge, { UserInfo } from "@vkontakte/vk-bridge"
import { createEffect, createEvent, createStore, sample } from "effector"
import { API } from "../api"
import { APIError, isAPIError } from "../api/APIError"

export namespace GameInfoEffects {
    export const $gameInfo = createStore<UserInfo | null>(null)

    export const $gameInfoError = createStore<APIError | null>(null)

    export const getGameInviteDataFx = createEffect(
        async (data: GameInfoFetch) => {
            const { ownerVkId } = await API.getRoom(data.mode, data.roomId)

            return bridge.send("VKWebAppGetUserInfo", {
                user_id: ownerVkId,
            })
        },
    )

    export const fetchGameInfo = createEvent<GameInfoFetch>()

    $gameInfo.on(getGameInviteDataFx.doneData, (_, data) => data)

    $gameInfoError.on(getGameInviteDataFx.failData, (_, error) => {
        if (isAPIError(error)) return error

        return null
    })

    export const clearGameInfo = createEvent()
    $gameInfo.on(clearGameInfo, () => null)

    sample({
        clock: fetchGameInfo,
        target: getGameInviteDataFx,
    })
}

interface GameInfoFetch {
    mode: TGameModeType
    roomId: string
}
