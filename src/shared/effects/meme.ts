import { Mark, MemeResponse } from "@shared"
import { TCommentWithOwner } from "@types"
import bridge, { UserInfo } from "@vkontakte/vk-bridge"
import { createEffect, createEvent, createStore, sample } from "effector"
import { API } from "../api"

type TMemeWithOwner = MemeResponse & { owner: UserInfo }

export const $meme = createStore<TMemeWithOwner | null>(null)

export const getMemeFx = createEffect(async (id: number) => {
    const meme = await API.meme(id)

    const owner = await bridge.send("VKWebAppGetUserInfo", {
        user_id: Number(meme.ownerId),
    })

    return Object.assign(meme, { owner }) as TMemeWithOwner
})
$meme.on(getMemeFx.doneData, (_, meme) => meme)

export const fetchMeme = createEvent<number>()
export const unmountMeme = createEvent()
$meme.reset(unmountMeme)

export const addToListFx = createEffect(API.addMemeToList)

export const addToList = createEvent<Mark | "favorite">()

sample({
    clock: fetchMeme,
    target: getMemeFx,
})

sample({
    source: {
        meme: $meme,
    },
    clock: addToList,
    fn: ({ meme }, type) => ({
        id: meme!.id,
        type,
    }),
    target: addToListFx,
})

sample({
    source: {
        meme: $meme,
    },
    clock: addToListFx.done,
    fn: ({ meme }) => meme?.id || -1,
    target: getMemeFx,
})

export const $comments = createStore<TCommentWithOwner[]>([])
$comments.reset(unmountMeme)

export const getCommentsFx = createEffect(async (id: number) => {
    const data = await API.memeComments(id, { page: 1, pageSize: 20 })

    return (await Promise.all(
        data.items.map(async (x) => {
            //TODO: use vk api user_ids
            const owner = await bridge.send("VKWebAppGetUserInfo", {
                user_id: Number(x.vkId),
            })

            return Object.assign(x, { owner })
        }),
    )) as TCommentWithOwner[]
})

$comments.on(getCommentsFx.doneData, (_, comments) => comments)

sample({
    clock: $meme,
    fn: (meme) => meme?.id || -1,
    target: getCommentsFx,
})
