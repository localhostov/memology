import bridge, { AppearanceType } from "@vkontakte/vk-bridge"
import { createEffect, createEvent, sample } from "effector"

export const bridgeInitFx = createEffect(() => bridge.send("VKWebAppInit"))

export const bridgeSetupNavColors = ({
    appearance,
    statusBarColor,
    navbarColor,
}: {
    appearance: AppearanceType
    statusBarColor: string
    navbarColor: string
}) => {
    bridge.send("VKWebAppSetViewSettings", {
        status_bar_style: appearance,
        action_bar_color: statusBarColor,
        navigation_bar_color: navbarColor,
    })
}
export const init = createEvent()

sample({
    clock: init,
    target: bridgeInitFx,
})
