import { createEffect, createEvent, createStore, sample } from "effector"
import { ReturnApiType } from "../../types"
import { API } from "../api"

export const $memesList = createStore<
    ReturnApiType<typeof API.memesList>["items"]
>([])

export const getMemesListFx = createEffect(() => API.memesList(1, 10))

$memesList.on(getMemesListFx.doneData, (_, memes) => memes.items)

export const fetchMemes = createEvent()

sample({
    clock: fetchMemes,
    target: getMemesListFx,
})
