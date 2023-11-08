import { Panel, PanelHeader } from "@vkontakte/vkui"
import { Panels } from "../shared"

export const Games = ({ id }: Props) => {
    return (
        <Panel id={id}>
            <PanelHeader>{Panels.GAMES_NAME}</PanelHeader>
        </Panel>
    )
}

interface Props {
    id: string
}
