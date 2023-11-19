import { GamesEffects, setSnackbar, useWebsocket } from "@shared"
import { IGameParticipant, TGameTabType, TSendFunction } from "@types"
import {
    Icon24GearOutline,
    Icon24LinkedOutline,
    Icon24Play,
    Icon24UsersOutline,
} from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import {
    Button,
    HorizontalScroll,
    Snackbar,
    Tabs,
    TabsItem,
} from "@vkontakte/vkui"
import { useList } from "effector-react"
import { useUnit } from "effector-react/compat"
import { ReactElement, useState } from "react"
import { GameParticipantListItem } from "../GameParticipantListItem/GameParticipantListItem"
import styles from "./styles.module.css"

export const GameLobby = ({ send }: { send: TSendFunction<"history"> }) => {
    const [activeTab, setActiveTab] = useState<TGameTabType>("participants")
    const users = useUnit(GamesEffects.History.$users)

    const copyInviteLink = () => {
        setSnackbar(
            <Snackbar
                onClose={() => setSnackbar(null)}
                before={
                    <Icon24LinkedOutline fill="var(--vkui--color_icon_positive)" />
                }
            >
                Ссылка-приглашение скопирована
            </Snackbar>,
        )
    }

    const tabContent: Record<TGameTabType, ReactElement> = {
        participants: ParticipantsTabContent(send),
        settings: SettingsTabContent(),
    }

    function onStartGame() {
        console.log("start")
        send("startGame", {})
    }

    return (
        <div>
            <Tabs>
                <HorizontalScroll arrowSize="m">
                    <TabsItem
                        before={<Icon24UsersOutline />}
                        selected={activeTab === "participants"}
                        onClick={() => setActiveTab("participants")}
                        status={users.length}
                    >
                        Участники
                    </TabsItem>

                    <TabsItem
                        before={<Icon24GearOutline />}
                        selected={activeTab === "settings"}
                        onClick={() => setActiveTab("settings")}
                    >
                        Настройки
                    </TabsItem>
                </HorizontalScroll>
            </Tabs>

            <div className={styles.container}>
                <div className={styles.buttons}>
                    <Button
                        size="l"
                        stretched
                        mode="secondary"
                        before={<Icon24LinkedOutline />}
                        onClick={copyInviteLink}
                    >
                        Пригласить
                    </Button>

                    <Button
                        size="l"
                        stretched
                        before={<Icon24Play />}
                        onClick={onStartGame}
                    >
                        Начать игру
                    </Button>
                </div>

                <div>{tabContent[activeTab]}</div>
            </div>
        </div>
    )
}

const ParticipantsTabContent = (send: TSendFunction<"history">) => {
    const usersList = useList(GamesEffects.History.$users, (item) => (
        <div key={item.vkId}>
            <GameParticipantListItem item={item} send={send} />
        </div>
    ))

    return (
        <div>
            <div className={styles.usersList}>{usersList}</div>
        </div>
    )
}

const SettingsTabContent = () => {
    return <div>когда-нибудь здесь будут настройки</div>
}
