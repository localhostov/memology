import { createEffect, createEvent, createStore, sample } from "effector"
import { ReturnApiType } from "../../types"
import { API } from "../api"

export const $memesList = createStore<
    ReturnApiType<typeof API.memesList>["items"]
>([])

export const $memesSearch = createStore("")

export const searchMeme = createEvent<string>()

$memesSearch.on(searchMeme, (_, query) => query)

export const getMemesListFx = createEffect((query: string) =>
    API.memesList(1, query, 10),
)

$memesList.on(getMemesListFx.doneData, (_, memes) => memes.items)

export const fetchMemes = createEvent()

sample({
    source: {
        memesList: $memesList,
    },
    clock: fetchMemes,
    filter: ({ memesList }) => memesList.length === 0,
    target: getMemesListFx,
})

sample({
    source: {
        search: $memesSearch,
    },
    fn: ({ search }) => search,
    clock: searchMeme,
    target: getMemesListFx,
})
