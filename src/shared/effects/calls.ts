import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, restore, sample } from "effector"

export const setCallLink = createEvent<string | null>()
export const $callLink = restore(setCallLink, null)

export const joinToCallFx = createEffect((link: string) =>
    bridge.send("VKWebAppCallJoin", { join_link: link }),
)

sample({
    clock: $callLink,
    filter: (link): link is string => link !== null,
    target: joinToCallFx,
})
