import { panelNames } from "@shared"
import { IPanelProps } from "@types"
import { Panel, PanelHeader } from "@vkontakte/vkui"

export const Games = ({ id }: IPanelProps) => {
    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>
        </Panel>
    )
}
