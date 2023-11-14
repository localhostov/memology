import { Modals, Panels } from "@shared"
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

export interface ITab {
    title: string
    isActive: boolean
    route: PanelPage<string>
    icon: ReactElement
}

export type TRatingTabListType = "weekly" | "eternal"

export type TProfileTabListType = "like" | "dislike" | "favorite" | "my"

export type TMemeMarkType = "like" | "dislike"
