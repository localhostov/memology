import { GamesListItem } from "@components"
import { panelNames, routes } from "@shared"
import { IGameModeItem, IPanelProps } from "@types"
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
                <Placeholder header="Выберите игру">
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

const gamesList: IGameModeItem[] = [
    {
        mode: "history",
        title: "История",
        description: "Какое-то описание, но не очень длинное",
        icon: "https://www.svgrepo.com/show/404648/paper-document-file-data.svg",
        route: routes.root.games.gameHistory,
    },
]
