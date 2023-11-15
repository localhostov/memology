import { GamesListItem } from "@components"
import { panelNames, routes } from "@shared"
import { IPanelProps } from "@types"
import { PanelPage } from "@vkontakte/vk-mini-apps-router/dist/page-types/PanelPage"
import { Group, Panel, PanelHeader, Placeholder } from "@vkontakte/vkui"
import styles from "./styles.module.css"

export const Games = ({ id }: IPanelProps) => {
    const renderGamesList = gamesList.map((item) => (
        <div key={item.mode}>
            <GamesListItem item={item} />
        </div>
    ))

    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group>
                <Placeholder header={"Выберите игру"}>
                    Чтобы продолжить, выберите режим, в который вы хотели бы
                    поиграть со своими друзьями
                </Placeholder>

                <div className={styles.gamesListContainer}>
                    {renderGamesList}
                </div>
            </Group>
        </Panel>
    )
}

export enum GameMode {
    HISTORY = "history",
}

const gamesList: GameModeItem[] = [
    {
        mode: GameMode.HISTORY,
        title: "История",
        description: "Какое-то описание, но не очень длинное",
        icon: "https://www.svgrepo.com/show/404648/paper-document-file-data.svg",
        route: routes.root.games.gameHistory,
    },
]

export interface GameModeItem {
    mode: GameMode
    title: string
    description: string
    icon: string
    route: PanelPage<string>
}
