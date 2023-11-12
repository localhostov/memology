import wretch from "wretch"
import QueryStringAddon from "wretch/addons/queryString"
import { TProfileTabListType } from "../../types"
import { MemeListResponse, UserResponse_UserItem } from "../proto"

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
}
