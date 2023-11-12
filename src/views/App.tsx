import "../styles/root.css"
import { RouterProvider } from "@vkontakte/vk-mini-apps-router"
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui"
import { useCallback, useEffect, useState } from "react"
import { getNamedWindowWidth, getUser, getVkUser, router } from "../shared"
import { Epic } from "./Epic"

export const App = () => {
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
