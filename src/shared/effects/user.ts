import { createEffect, createEvent, createStore, sample } from "effector"
import { ReturnApiType } from "../../types"
import { API } from "../api"
import bridge, { UserInfo } from "@vkontakte/vk-bridge"

export const $user = createStore<ReturnApiType<typeof API.user> | null>(null)

export const getUserFx = createEffect(API.user)

$user.on(getUserFx.doneData, (_, user) => user)

export const getUser = createEvent()

sample({
    clock: getUser,
    target: getUserFx,
})

/* -- get vk user data from bridge --  */

const getVkUserData = async (): Promise<UserInfo> => {
    return await bridge.send("VKWebAppGetUserInfo")
}

export const $vkUserData = createStore<UserInfo | null>(null)
export const getVkUserDataFx = createEffect(getVkUserData)
$vkUserData.on(getVkUserDataFx.doneData, (_, data) => data)

export const getVkUser = createEvent()

sample({
    clock: getVkUser,
    target: getVkUserDataFx,
})
