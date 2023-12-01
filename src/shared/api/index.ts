import {
    CommentsResponse_CommentsListResponse,
    GetRoomInfoResponse,
    Mark,
    MemeListResponse,
    MemeRatingResponse,
    MemeResponse,
    UserResponse_UserItem,
} from "@shared"
import { TGameModeType, TProfileTabListType, TRatingTabListType } from "@types"
import wretch from "wretch"
import FormDataAddon from "wretch/addons/formData"
import QueryStringAddon from "wretch/addons/queryString"
import { APIError } from "./APIError"

export * from "./APIError"

const api = wretch("https://memology.animaru.app")
    .headers({
        "vk-params": window.location.search.slice(1),
    })
    .addon(QueryStringAddon)
    .addon(FormDataAddon)
    .catcherFallback(async (error) => {
        throw new APIError(error.text!)
    })

export class API {
    static async user() {
        const buffer = await api.get("/user").arrayBuffer()

        return UserResponse_UserItem.fromBinary(new Uint8Array(buffer))
    }

    static async memesList(query: string, page: number, pageSize?: number) {
        const buffer = await api
            .query({
                query,
                page,
                pageSize,
            })
            .get("/meme/list")
            .arrayBuffer()

        return MemeListResponse.fromBinary(new Uint8Array(buffer))
    }

    static async profileMemesList({
        type,
        query,
        page,
        pageSize,
    }: {
        type: TProfileTabListType
        query: string
        page: number
        pageSize?: number
    }) {
        const buffer = await api
            .query({
                query,
                page,
                pageSize,
            })
            .get(`/list/${type}`)
            .arrayBuffer()

        return MemeListResponse.fromBinary(new Uint8Array(buffer))
    }

    static async meme(id: number) {
        const buffer = await api.get(`/meme/${id}`).arrayBuffer()

        return MemeResponse.fromBinary(new Uint8Array(buffer))
    }

    static async addMemeToList({
        id,
        type,
    }: {
        id: number
        type: Mark | "favorite"
    }) {
        const remapper = {
            [Mark.LIKE]: "like",
            [Mark.DISLIKE]: "dislike",
            favorite: "favorite",
        }

        const res = await api.get(`/meme/${id}/add/${remapper[type]}`).res()

        return res.ok
    }

    static async memeComments(
        memeId: number,
        { page, pageSize }: { page: number; pageSize?: number },
    ) {
        const buffer = await api
            .query({
                page,
                pageSize,
            })
            .get(`/meme/${memeId}/comment/list`)
            .arrayBuffer()

        return CommentsResponse_CommentsListResponse.fromBinary(
            new Uint8Array(buffer),
        )
    }

    static async memesRating(
        type: TRatingTabListType,
        { page, pageSize }: { page: number; pageSize?: number },
    ) {
        const buffer = await api
            .query({
                page,
                pageSize,
            })
            .get(`/rating/${type}`)
            .arrayBuffer()

        return MemeRatingResponse.fromBinary(new Uint8Array(buffer))
    }

    static async deleteComment({
        memeId,
        commentId,
    }: {
        memeId: number
        commentId: number
    }) {
        const res = await api
            .get(`/meme/${memeId}/comment/${commentId}/delete`)
            .res()

        return res.ok
    }

    static async addComment({
        memeId,
        text,
    }: {
        memeId: number
        text: string
    }) {
        const res = await api
            .url(`/meme/${memeId}/comment/add`)
            .post(text)
            .res()

        return res.ok
    }

    static async createRoom(type: TGameModeType) {
        return api.url(`/game/${type}/create`).get().text()
    }

    static async getRoom(type: TGameModeType, roomId: string) {
        const buffer = await api.get(`/game/${type}/${roomId}`).arrayBuffer()

        return GetRoomInfoResponse.fromBinary(new Uint8Array(buffer))
    }

    static async suggestMeme({
        title,
        description,
        image,
    }: {
        title: string
        description: string
        image: File
    }) {
        return api
            .formData({ title, description, image })
            .url("/meme/suggest")
            .post()
    }

    static async deleteMeme(id: number) {
        return api.post(`/meme/${id}/delete`)
    }
}
