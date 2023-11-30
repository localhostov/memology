import { Mark, MemeResponse } from "@shared"
import { TCommentWithOwner } from "@types"
import bridge, { UserInfo } from "@vkontakte/vk-bridge"
import {
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from "effector"
import { debounce } from "patronum"
import { API } from "../api"
import { APIError, isAPIError } from "../api/APIError"

type TMemeWithOwner = MemeResponse & { owner: UserInfo }

export const getMemeFx = createEffect(async (id: number) => {
    const meme = await API.meme(id)

    const owner = await bridge.send("VKWebAppGetUserInfo", {
        user_id: Number(meme.ownerId),
    })

    return Object.assign(meme, { owner }) as TMemeWithOwner
})
export const $meme = restore(getMemeFx, null)
export const $memeError = createStore<APIError | null>(null)
$memeError.reset(getMemeFx)
$memeError.on(getMemeFx.failData, (_, error) => {
    if (isAPIError(error)) return error
    return null
})

export const fetchMeme = createEvent<number>()
export const unmountMeme = createEvent()
$meme.reset(unmountMeme)

export const addToListFx = createEffect(API.addMemeToList)

export const addToList = createEvent<Mark | "favorite">()

// [INFO] patronum not copy all sample features...
export const debouncedAddToList = createEvent<{
    id: number
    type: Mark | "favorite"
}>()
//TODO: add debounce logic
debounce({
    source: debouncedAddToList,
    timeout: 10,
    target: addToListFx,
})
$meme.on(addToList, (current, type) => {
    if (current) {
        if (type === Mark.LIKE)
            return {
                ...current,
                mark: current.mark !== Mark.LIKE ? Mark.LIKE : undefined,
                likesCount:
                    current.mark === Mark.LIKE
                        ? current.likesCount - 1
                        : current.mark === Mark.DISLIKE
                          ? current.likesCount + 2
                          : current.likesCount + 1,
            }
        if (type === Mark.DISLIKE)
            return {
                ...current,
                mark: current.mark !== Mark.DISLIKE ? Mark.DISLIKE : undefined,
                likesCount:
                    current.mark === Mark.LIKE
                        ? current.likesCount - 2
                        : current.mark === Mark.DISLIKE
                          ? current.likesCount + 1
                          : current.likesCount - 1,
            }
        if (type === "favorite") {
            const newState = !current.isFavorites
            return {
                ...current,
                isFavorites: newState,
                favoritesCount: newState
                    ? current.favoritesCount + 1
                    : current.favoritesCount - 1,
            }
        }
    }
})
sample({
    source: $meme,
    clock: addToList,
    filter: (meme: TMemeWithOwner | null): meme is TMemeWithOwner =>
        meme !== null,
    fn: (meme, type) => ({ id: meme.id, type }),
    target: debouncedAddToList,
})

// sample({
//     source: {
//         meme: $meme,
//     },
//     clock: addToListFx.done,
//     fn: ({ meme }) => meme?.id || -1,
//     target: getMemeFx,
// })

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
export const $comments = restore(getCommentsFx, [])
$comments.reset(unmountMeme)

sample({
    clock: fetchMeme,
    target: getMemeFx,
})
sample({
    clock: getMemeFx.done,
    fn: ({ params }) => params,
    target: getCommentsFx,
})

export const createComment = createEvent<string>()

export const createCommentFx = createEffect(API.addComment)

sample({
    source: $meme,
    clock: createComment,
    filter: (meme: TMemeWithOwner | null): meme is TMemeWithOwner =>
        meme !== null,
    fn: (meme, text) => ({ memeId: meme.id, text }),
    target: createCommentFx,
})

export const deleteComment = createEvent<number>()

export const deleteCommentFx = createEffect(API.deleteComment)

sample({
    source: $meme,
    clock: deleteComment,
    filter: (meme: TMemeWithOwner | null): meme is TMemeWithOwner =>
        meme !== null,
    fn: (meme, commentId) => ({ memeId: meme.id, commentId }),
    target: deleteCommentFx,
})

sample({
    clock: [createCommentFx.done, deleteCommentFx.done],
    fn: ({ params }) => params.memeId,
    target: getCommentsFx,
})
