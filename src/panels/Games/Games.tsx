import { GamesListItem, MainTabPanelHeader } from "@components"
import { panelNames, routes } from "@shared"
import { IGameModeItem, IPanelProps } from "@types"
import { Icon28PencilSquare, Icon36GameOutline } from "@vkontakte/icons"
import { Group, Panel, Placeholder } from "@vkontakte/vkui"
import styles from "./styles.module.css"

export const Games = ({ id }: IPanelProps) => {
    const renderGamesList = gamesList.map((item) => (
        <div key={item.mode}>
            <GamesListItem item={item} />
        </div>
    ))

    return (
        <Panel id={id}>
            <MainTabPanelHeader children={panelNames[id]} />

            <Group>
                <Placeholder
                    header="Выберите игру"
                    icon={
                        <Icon36GameOutline
                            style={{
                                width: 56,
                                height: 56,
                                color: "var(--app-accent)",
                            }}
                            className={styles.iconAnimation}
                        />
                    }
                >
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
        description: "Создание истории исходя из предыдущего предложения",
        icon: <Icon28PencilSquare style={{ height: 36, width: 36 }} />,
        route: routes.root.games.gameHistory,
    },
]
