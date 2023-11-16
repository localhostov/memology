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
    const data = (await API.memeComments(id, { page: 1, pageSize: 20 })).items
    const result: TCommentWithOwner[] = []

    for await (const item of data) {
        const owner = await bridge.send("VKWebAppGetUserInfo", {
            user_id: Number(item.vkId),
        })

        result.push(Object.assign(item, { owner }))
    }

    return result
})

$comments.on(getCommentsFx.doneData, (_, comments) => comments)

sample({
    clock: $meme,
    fn: (meme) => meme?.id || -1,
    target: getCommentsFx,
})

export const createComment = createEvent<string>()

export const createCommentFx = createEffect(API.addComment)

sample({
    source: {
        meme: $meme,
    },
    clock: createComment,
    fn: ({ meme }, text) => ({ memeId: meme?.id || -1, text }),
    target: createCommentFx,
})

export const deleteComment = createEvent<number>()

export const deleteCommentFx = createEffect(API.deleteComment)

sample({
    source: {
        meme: $meme,
    },
    clock: deleteComment,
    fn: ({ meme }, commentId) => ({ memeId: meme?.id || -1, commentId }),
    target: deleteCommentFx,
})

sample({
    clock: [createCommentFx.done, deleteCommentFx.done],
    fn: ({ params }) => params.memeId,
    target: getCommentsFx,
})
