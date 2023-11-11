import { Icon56NewsfeedOutline } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
} from "@vkontakte/vkui"
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

            <Group style={{ height: "1000px" }}>
                <Placeholder
                    icon={<Icon56NewsfeedOutline width={56} height={56} />}
                >
                    {params?.memeId}
                </Placeholder>
            </Group>
        </Panel>
    )
}
