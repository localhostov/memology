import { Panel, PanelHeader } from "@vkontakte/vkui"
import { panelNames } from "../../shared"
import { IPanelProps } from "../../types"

export const Games = ({ id }: IPanelProps) => {
    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>
        </Panel>
    )
}
