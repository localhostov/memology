import { RouterProvider } from "@vkontakte/vk-mini-apps-router"
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui"
import { router } from "../shared"
import { Epic } from "./Epic"

export const App = () => {
    return (
        <ConfigProvider hasCustomPanelHeaderAfter={true}>
            <AdaptivityProvider>
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
