import { ReturnApiType, TRatingTabListType } from "@types"
import {
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from "effector"
import { API } from "../api"

export type TRatingItem = ReturnApiType<typeof API.memesRating>["items"][0]

export namespace RatingEffects {
    export const $items = createStore<TRatingItem[]>([])

    export const getRatingItemsFx = createEffect(
        (type: Parameters<typeof API.memesRating>[0]) =>
            API.memesRating(type, { page: 1, pageSize: 20 }),
    )
    $items.on(getRatingItemsFx.doneData, (_, { items }) => items)

    export const fetchRatingItems = createEvent()

    export const selectTab = createEvent<TRatingTabListType>()
    export const $selectedTab = restore(selectTab, "eternal")
    $items.reset(selectTab)

    sample({
        source: $selectedTab,
        clock: fetchRatingItems,
        target: getRatingItemsFx,
    })

    sample({
        clock: $selectedTab,
        target: getRatingItemsFx,
    })
}
