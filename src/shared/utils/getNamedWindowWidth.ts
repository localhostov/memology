import { ViewWidth } from "@vkontakte/vkui"

export const getNamedWindowWidth = (width: number) => {
    if (width < 1000) return ViewWidth.MOBILE

    return ViewWidth.DESKTOP
}
