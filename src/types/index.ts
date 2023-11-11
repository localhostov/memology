import { Panels } from "../shared"

export interface IPanelProps {
    id: Panels
}

export type ReturnApiType<T extends (...args: any[]) => any> = Awaited<
    ReturnType<T>
>
