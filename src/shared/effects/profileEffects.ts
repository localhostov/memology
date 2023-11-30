import { ReturnApiType, TProfileTabListType } from "@types"
import {
    combine,
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from "effector"
import { debounce } from "patronum"
import { API } from "../api"

export namespace ProfileEffects {
    export const $memesList = createStore<
        ReturnApiType<typeof API.profileMemesList>["items"] | null
    >(null)

    export const selectTab = createEvent<TProfileTabListType>()
    export const $selectedTab = restore(selectTab, "like")

    $memesList.reset(selectTab)

    export const getMemesListFx = createEffect(
        ({ type, query }: { type: TProfileTabListType; query: string }) =>
            API.profileMemesList({ type, query, page: 1, pageSize: 20 }),
    )

    $memesList.on(getMemesListFx.doneData, (_, memes) => memes.items)

    export const fetchMemes = createEvent()

    export const searchMeme = createEvent<string>()

    export const $memesSearch = restore(searchMeme, "")

    // [INFO] patronum does not allow you to specify object stores
    const $tabbedSearch = combine(
        $selectedTab,
        $memesSearch,
        (type, query) => ({ type, query }),
    )

    sample({
        source: $tabbedSearch,
        clock: fetchMemes,
        target: getMemesListFx,
    })

    debounce({
        source: $tabbedSearch,
        timeout: 200,
        target: getMemesListFx,
    })
}
