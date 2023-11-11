import { RouterProvider } from "@vkontakte/vk-mini-apps-router"
import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    ViewWidth,
} from "@vkontakte/vkui"
import { router } from "../shared"
import { Epic } from "./Epic"

export const App = () => {
    const getNamedWindowWidth = () => {
        const width = window.innerWidth

        if (width > 320 && width < 600) {
            return ViewWidth.MOBILE
        }
        if (width > 600 && width < 1000) {
            return ViewWidth.TABLET
        }
        if (width >= 1000) {
            return ViewWidth.DESKTOP
        }
    }

    return (
        <ConfigProvider>
            <AdaptivityProvider viewWidth={getNamedWindowWidth()}>
                <AppRoot>
                    <RouterProvider
                        router={router}
                        notFound={<p>Ничегошеньки!</p>}
                    >
                        <Epic />
                    </RouterProvider>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    )
}
