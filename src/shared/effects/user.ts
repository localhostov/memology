import { createEffect, createEvent, createStore, sample } from "effector"
import { ReturnApiType } from "../../types"
import { API } from "../api"

export const $user = createStore<ReturnApiType<typeof API.user> | null>(null)

export const getUserFx = createEffect(API.user)

$user.on(getUserFx.doneData, (_, user) => user)

export const getUser = createEvent()

sample({
    clock: getUser,
    target: getUserFx,
})
