import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, sample } from "effector"

export const bridgeInitFx = createEffect(() => bridge.send("VKWebAppInit"))

export const init = createEvent()

sample({
    clock: init,
    target: bridgeInitFx,
})
