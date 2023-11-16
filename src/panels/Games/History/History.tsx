import { UserInGameListItem } from "@components"
import { $vkUserData, panelNames } from "@shared"
import { IPanelProps } from "@types"
import {
    Icon24GearOutline,
    Icon24LinkedOutline,
    Icon24Play,
    Icon24Users3Outline,
} from "@vkontakte/icons"
import { UserInfo } from "@vkontakte/vk-bridge"
import { Button, Group, Panel, PanelHeader } from "@vkontakte/vkui"
import { useUnit } from "effector-react/compat"
import styles from "./styles.module.css"

export const HistoryGame = ({ id }: IPanelProps) => {
    const vkUserData = useUnit($vkUserData)

    const mockedUsersList: UserInfo[] = [vkUserData!, vkUserData!]

    const usersList = mockedUsersList.map((item) => (
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
                        size={"l"}
                        stretched
                        mode={"secondary"}
                        before={<Icon24LinkedOutline />}
                    >
                        Пригласить
                    </Button>

                    <Button size={"l"} stretched before={<Icon24Play />}>
                        Начать игру
                    </Button>
                </div>

                <div className={styles.container}>
                    <div className={styles.usersContainer}>
                        <div className={styles.usersContainerHeader}>
                            <Icon24Users3Outline />
                            Участников: {mockedUsersList.length}
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
