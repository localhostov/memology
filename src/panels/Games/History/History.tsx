import { panelNames } from "@shared"
import { IPanelProps } from "@types"
import { Group, Panel, PanelHeader } from "@vkontakte/vkui"

export const HistoryGame = ({ id }: IPanelProps) => {
    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group>adsf</Group>
        </Panel>
    )
}
