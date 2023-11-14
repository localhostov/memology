import {
    Mark,
    MemeListResponse,
    MemeResponse,
    UserResponse_UserItem,
} from "@shared"
import { TProfileTabListType } from "@types"
import wretch from "wretch"
import QueryStringAddon from "wretch/addons/queryString"

const api = wretch("https://memology.animaru.app")
    .headers({
        "vk-params": window.location.search.slice(1),
    })
    .addon(QueryStringAddon)

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
}
