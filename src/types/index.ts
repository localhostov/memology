import { PanelPage } from "@vkontakte/vk-mini-apps-router/dist/page-types/PanelPage"
import { ReactElement } from "react"
import { Panels } from "../shared"

export interface IPanelProps {
    id: Panels
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
