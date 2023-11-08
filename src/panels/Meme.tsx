import { Icon56NewsfeedOutline } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
} from "@vkontakte/vkui"
import { Panels } from "../shared"

export const Meme = ({ id }: Props) => {
    const navigator = useRouteNavigator()
    const params = useParams<"memeId">()

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => navigator.back()} />}
            >
                {Panels.MEME_NAME}
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

interface Props {
    id: string
}
