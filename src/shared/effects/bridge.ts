import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, sample } from "effector"
import { getUserFx, getVkUserDataFx } from "./user"

export const bridgeInitFx = createEffect(() => bridge.send("VKWebAppInit"))

export const init = createEvent()

sample({
    clock: init,
    target: [getUserFx, getVkUserDataFx, bridgeInitFx],
})
