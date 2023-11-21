import {
    CommentsResponse_CommentItem,
    Modals,
    Panels,
    WebsocketClient,
    WebsocketServer,
    WebsocketServer_HistoryEvents_LobbyUser,
} from "@shared"
import { UserInfo } from "@vkontakte/vk-bridge"
import { PanelPage } from "@vkontakte/vk-mini-apps-router/dist/page-types/PanelPage"
import { ReactElement } from "react"

export interface IPanelProps {
    id: Panels
}

export interface IModalProps {
    id: Modals
}

export type ReturnApiType<T extends (...args: any[]) => any> = Awaited<
    ReturnType<T>
>

export interface IGameParticipant
    extends WebsocketServer_HistoryEvents_LobbyUser {
    vkData: UserInfo
}

export interface ITab {
    title: string
    isActive: boolean
    route: PanelPage<string>
    icon: ReactElement
}

export interface IGameModeItem {
    mode: TGameModeType
    title: string
    description: string
    icon: ReactElement
    route: PanelPage<string>
}

export type TRatingTabListType = "weekly" | "eternal"

export type TProfileTabListType = "like" | "dislike" | "favorite" | "my"

export type TMemeMarkType = "like" | "dislike"

export type TGameTabType = "participants" | "settings"

export type TGameModeType = "history"

export type TCommentWithOwner = CommentsResponse_CommentItem & {
    owner: UserInfo
}

export type TSendFunction<T extends keyof WebsocketServer> = <
    C extends keyof NonNullable<WebsocketClient[T]>,
>(
    cmdName: C,
    data: NonNullable<NonNullable<WebsocketClient[T]>[C]>,
) => void

export type TGameHistoryStepType = "meWrite" | "readyResult" | "showResult"
