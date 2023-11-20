import {
    useFirstPageCheck,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router"

export const useSafeBack = () => {
    const navigator = useRouteNavigator()
    const isFirstPage = useFirstPageCheck()

    const back = (to?: number) => {
        if (isFirstPage) {
            navigator.push("/")
        } else {
            navigator.back(to)
        }
    }

    return {
        back,
    }
}
