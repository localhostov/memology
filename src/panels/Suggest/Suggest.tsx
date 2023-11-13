import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui"
import { panelNames } from "../../shared"
import { IPanelProps } from "../../types"

export const Suggest = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => navigator.back()} />}
            >
                {panelNames[id]}
            </PanelHeader>

            <Group />
        </Panel>
    )
}
