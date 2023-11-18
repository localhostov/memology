import { GameParticipantListItem } from "@components"
import { GamesEffects, panelNames, setSnackbar, useWebsocket } from "@shared"
import { IGameParticipant, IPanelProps, TGameTabType } from "@types"
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
import { useUnit } from "effector-react/compat"
import { ReactElement, useState } from "react"
import styles from "./styles.module.css"

export const HistoryGame = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const [activeTab, setActiveTab] = useState<TGameTabType>("participants")

    const users = useUnit(GamesEffects.History.$users)

    useWebsocket("history", {
        lobbyInfo: async (msg) => {
            //TODO: place in effects
            const result: IGameParticipant[] = []

            for await (const vkId of msg.vkIds) {
                const owner = await bridge.send("VKWebAppGetUserInfo", {
                    user_id: vkId,
                })

                result.push({
                    vkData: owner,
                    isOwner: false,
                })
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
        participants: ParticipantsTabContent(users),
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

const ParticipantsTabContent = (users: IGameParticipant[]) => {
    const usersList = users.map((item) => (
        <div key={item.vkData.id}>
            <GameParticipantListItem item={item} />
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
