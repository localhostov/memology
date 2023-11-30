import { PanelHeader, Platform, usePlatform } from "@vkontakte/vkui"
import { PanelHeaderProps } from "@vkontakte/vkui/src/components/PanelHeader/PanelHeader"

export const MainTabPanelHeader = (props: PanelHeaderProps) => {
    const platform = usePlatform()
    const isVKCOM = Platform.VKCOM === platform

    return isVKCOM ? null : <PanelHeader {...props} />
}
