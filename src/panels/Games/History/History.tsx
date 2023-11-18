import { GameParticipantListItem } from "@components"
import { GamesEffects, panelNames, setSnackbar, useWebsocket } from "@shared"
import {
    IGameParticipant,
    IPanelProps,
    TGameTabType,
    TSendFunction,
} from "@types"
import {
    Icon24GearOutline,
    Icon24LinkedOutline,
    Icon24Play,
    Icon24UsersOutline,
} from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    Group,
    HorizontalScroll,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Snackbar,
    Tabs,
    TabsItem,
} from "@vkontakte/vkui"
import { useList } from "effector-react"
import { useUnit } from "effector-react/compat"
import { ReactElement, useState } from "react"
import styles from "./styles.module.css"

export const HistoryGame = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const [activeTab, setActiveTab] = useState<TGameTabType>("participants")

    const users = useUnit(GamesEffects.History.$users)

    const { send } = useWebsocket("history", {
        lobbyInfo: async (msg) => {
            //TODO: place in effects
            const result: IGameParticipant[] = []

            for await (const user of msg.users) {
                const vkData = await bridge.send("VKWebAppGetUserInfo", {
                    user_id: user.vkId,
                })

                result.push(Object.assign(user, { vkData }))
            }

            GamesEffects.History.addUser(result)
        },
    })

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

    const startGame = () => {
        console.log("user started game")
    }

    const tabContent: Record<TGameTabType, ReactElement> = {
        participants: ParticipantsTabContent(send),
        settings: SettingsTabContent(),
    }

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => navigator.back()} />}
            >
                {panelNames[id]}
            </PanelHeader>

            <Group>
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
                            onClick={startGame}
                        >
                            Начать игру
                        </Button>
                    </div>

                    <div>{tabContent[activeTab]}</div>
                </div>
            </Group>
        </Panel>
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
