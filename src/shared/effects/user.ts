import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, restore, sample } from "effector"
import { API } from "../api"

export const getUserFx = createEffect(API.user)

export const $user = restore(getUserFx, null)

export const getUser = createEvent()

sample({
    clock: getUser,
    target: getUserFx,
})

/* -- get vk user data from bridge --  */

export const getVkUserDataFx = createEffect(() =>
    bridge.send("VKWebAppGetUserInfo"),
)
export const $vkUserData = restore(getVkUserDataFx, null)

export const getVkUser = createEvent()

sample({
    clock: getVkUser,
    target: getVkUserDataFx,
})
