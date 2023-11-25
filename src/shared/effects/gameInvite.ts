import { TGameModeType } from "@types"
import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, restore, sample } from "effector"
import { API } from "../api"
import { isAPIError } from "../api/APIError"

interface GameInfoFetch {
    mode: TGameModeType
    roomId: string
}

export namespace GameInfoEffects {
    export const getGameInviteDataFx = createEffect(
        async (data: GameInfoFetch) => {
            const { ownerVkId } = await API.getRoom(data.mode, data.roomId)

            return bridge.send("VKWebAppGetUserInfo", {
                user_id: ownerVkId,
            })
        },
    )
    export const $gameInfo = restore(getGameInviteDataFx, null)
    export const $gameInfoError = restore(getGameInviteDataFx.failData, null)

    export const fetchGameInfo = createEvent<GameInfoFetch>()

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
