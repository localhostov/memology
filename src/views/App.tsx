import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui"
import { RouterProvider } from "@vkontakte/vk-mini-apps-router"
import { router } from "../shared"
import { Epic } from "./Epic"
import { useCallback, useEffect, useState } from "react"
import { getNamedWindowWidth } from "../utils"
import "../styles/root.css"

export const App = () => {
    const [windowWidth, setWindowWidth] = useState(
        getNamedWindowWidth(window.innerWidth),
    )

    const handleWindowResize = useCallback(() => {
        setWindowWidth(getNamedWindowWidth(window.innerWidth))
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
