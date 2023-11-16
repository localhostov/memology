import {
    bridgeSetupNavColors,
    getNamedWindowWidth,
    getUser,
    getVkUser,
    router,
} from "@shared"
import { RouterProvider } from "@vkontakte/vk-mini-apps-router"
import {
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    useAppearance,
} from "@vkontakte/vkui"
import { useCallback, useEffect, useState } from "react"
import { Epic } from "./Epic"

export const App = () => {
    const appearance = useAppearance()
    const [windowWidth, setWindowWidth] = useState(
        getNamedWindowWidth(window.innerWidth),
    )

    const handleWindowResize = useCallback(() => {
        setWindowWidth(getNamedWindowWidth(window.innerWidth))
    }, [])

    useEffect(() => {
        getUser()
        getVkUser()
    }, [])

    useEffect(() => {
        const statusBarColor = getComputedStyle(
            document.documentElement,
        ).getPropertyValue("--background-content")
        const navbarColor = getComputedStyle(
            document.documentElement,
        ).getPropertyValue("--tabbar-background")

        bridgeSetupNavColors({
            appearance,
            statusBarColor,
            navbarColor,
        })
    }, [appearance])

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [handleWindowResize])

    return (
        <ConfigProvider>
            <AdaptivityProvider viewWidth={windowWidth}>
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
