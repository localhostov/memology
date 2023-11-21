import { router, transformVKBridgeAdaptivity } from "@shared"
import bridge, {
    parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge"
import {
    useAdaptivity,
    useAppearance,
    useInsets,
} from "@vkontakte/vk-bridge-react"
import { RouterProvider } from "@vkontakte/vk-mini-apps-router"
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui"
import { Epic } from "./Epic"

export const App = () => {
    const vkBridgeAppearance = useAppearance()!
    const vkBridgeAdaptivityProps = transformVKBridgeAdaptivity(useAdaptivity())
    const vkBridgeInsets = useInsets()!
    const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
        window.location.search,
    )

    return (
        <ConfigProvider
            appearance={vkBridgeAppearance}
            platform={vk_platform === "desktop_web" ? "vkcom" : undefined}
            isWebView={bridge.isWebView()}
            hasCustomPanelHeaderAfter={true}
        >
            <AdaptivityProvider {...vkBridgeAdaptivityProps}>
                <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
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
