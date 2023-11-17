import { UserInGameListItem } from "@components"
import { GamesEffects, panelNames, useWebsocket } from "@shared"
import { IPanelProps } from "@types"
import {
    Icon24GearOutline,
    Icon24LinkedOutline,
    Icon24Play,
    Icon24Users3Outline,
} from "@vkontakte/icons"
import bridge, { UserInfo } from "@vkontakte/vk-bridge"
import { Button, Group, Panel, PanelHeader } from "@vkontakte/vkui"
import { useList } from "effector-react"
import { useUnit } from "effector-react/compat"
import styles from "./styles.module.css"

export const HistoryGame = ({ id }: IPanelProps) => {
    const users = useUnit(GamesEffects.History.$users)

    useWebsocket("history", {
        lobbyInfo: async (msg) => {
            //TODO: place in effects
            const result: UserInfo[] = []

            for await (const vkId of msg.vkIds) {
                const owner = await bridge.send("VKWebAppGetUserInfo", {
                    user_id: vkId,
                })

                result.push(owner)
            }

            GamesEffects.History.addUser(result)
        },
    })

    const usersList = useList(GamesEffects.History.$users, (item) => (
        <div key={item.id}>
            <UserInGameListItem item={item} />
        </div>
    ))

    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group>
                <div className={styles.buttons}>
                    <Button
                        size="l"
                        stretched
                        mode="secondary"
                        before={<Icon24LinkedOutline />}
                    >
                        Пригласить
                    </Button>

                    <Button size="l" stretched before={<Icon24Play />}>
                        Начать игру
                    </Button>
                </div>

                <div className={styles.container}>
                    <div className={styles.usersContainer}>
                        <div className={styles.usersContainerHeader}>
                            <Icon24Users3Outline />
                            Участников: {users.length}
                        </div>

                        <div className={styles.usersList}>{usersList}</div>
                    </div>

                    <div className={styles.settingsContainer}>
                        <div className={styles.usersContainerHeader}>
                            <Icon24GearOutline />
                            Настройки
                        </div>
                    </div>
                </div>
            </Group>
        </Panel>
    )
}
