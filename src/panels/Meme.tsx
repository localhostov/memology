import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui"
import { panelNames } from "../shared"
import { IPanelProps } from "../types"

export const Meme = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"memeId">()

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => navigator.back()} />}
            >
                {panelNames[id]}
            </PanelHeader>

            <Group>{params?.memeId}</Group>
        </Panel>
    )
}
