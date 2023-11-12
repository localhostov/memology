import { createEffect, createEvent, createStore, sample } from "effector"
import { debounce } from "patronum"
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
        search: $memesSearch,
    },
    clock: fetchMemes,
    filter: ({ memesList }) => memesList.length === 0,
    fn: ({ search }) => search,
    target: getMemesListFx,
})

debounce({
    source: $memesSearch,
    timeout: 200,
    target: getMemesListFx,
})
