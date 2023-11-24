import { $vkUserData, GamesEffects, Modals, setSnackbar } from "@shared"
import { TGameModeType, TGameTabType, TSendFunction } from "@types"
import {
    Icon20LogoVkCallsOutline,
    Icon24ClockCircleDashedOutline,
    Icon24GearOutline,
    Icon24LinkedOutline,
    Icon24Play,
    Icon24UsersOutline,
} from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    HorizontalScroll,
    Placeholder,
    Select,
    SimpleCell,
    Snackbar,
    Spinner,
    Tabs,
    TabsItem,
} from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { ReactElement, useState } from "react"
import { GameParticipantListItem } from "../GameParticipantListItem/GameParticipantListItem"
import styles from "./styles.module.css"
import setCallData = GamesEffects.History.setCallLink
import setCallLink = GamesEffects.History.setCallLink

export const GameLobby = ({ send }: { send: TSendFunction<TGameModeType> }) => {
    const navigator = useRouteNavigator()
    const users = useUnit(GamesEffects.History.$users)
    const vkUserData = useUnit($vkUserData)
    const [activeTab, setActiveTab] = useState<TGameTabType>("participants")
    const [callButtonLoading, setCallButtonLoading] = useState(false)
    const params = useParams<"roomId">()
    const gameOwner = users.find((user) => user.isOwner)
    const callLink = useUnit(GamesEffects.History.$callLink)

    const share = () => {
        navigator.push(`/games/history/${params?.roomId}/share`)
    }

    const tabContent: Record<TGameTabType, ReactElement> = {
        participants: ParticipantsTabContent(send),
        settings: SettingsTabContent(),
    }

    const onStartGame = () => {
        send("startGame", {})
    }

    const callAction = () => {
        const isOwner = vkUserData?.id === gameOwner?.vkId

        if (isOwner) {
            if (!callLink) {
                setCallButtonLoading(true)

                bridge
                    .send("VKWebAppCallStart")
                    .then((data) => {
                        if (data.result) {
                            setCallLink(data.join_link)
                        }
                    })
                    .catch(() => {
                        setSnackbar(
                            <Snackbar onClose={() => setSnackbar(null)}>
                                Произошла ошибка при создании звонка, попробуйте
                                снова
                            </Snackbar>,
                        )
                    })
                    .finally(() => setCallButtonLoading(false))
            }
        } else if (callLink !== null) {
            bridge.send("VKWebAppCallJoin", {
                join_link: callLink,
            })
        }
    }

    return users.length === 0 ? (
        <Placeholder
            header="Создаём комнату"
            icon={<Spinner size="large" />}
            children="Загружаем всё необходимое"
        />
    ) : (
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
                        onClick={share}
                    >
                        Пригласить
                    </Button>

                    <Button
                        stretched
                        size="l"
                        onClick={callAction}
                        loading={callButtonLoading}
                        before={
                            <Icon20LogoVkCallsOutline
                                style={{ width: 24, height: 24 }}
                            />
                        }
                        disabled={
                            (vkUserData?.id === gameOwner?.vkData.id &&
                                callLink !== null) ||
                            (vkUserData?.id !== gameOwner?.vkData.id &&
                                callLink === null)
                        }
                    >
                        {vkUserData?.id === gameOwner?.vkData.id
                            ? callLink
                                ? "Звонок активен"
                                : "Начать звонок"
                            : "Присоединиться к звонку"}
                    </Button>
                </div>

                <div style={{ height: 8 }} />

                {vkUserData?.id === gameOwner?.vkId && (
                    <Button
                        size="l"
                        stretched
                        before={<Icon24Play />}
                        onClick={onStartGame}
                    >
                        Начать игру
                    </Button>
                )}

                <div style={{ height: 16 }} />

                <div>{tabContent[activeTab]}</div>
            </div>
        </div>
    )
}

const ParticipantsTabContent = (send: TSendFunction<TGameModeType>) => {
    const users = useUnit(GamesEffects.History.$users)
    const gameOwner = users.find((it) => it.isOwner)
    const usersList = useList(GamesEffects.History.$users, (item) => (
        <div key={item.vkId}>
            <GameParticipantListItem
                item={item}
                send={send}
                ownerId={gameOwner?.vkId}
            />
        </div>
    ))

    return (
        <div>
            <div className={styles.usersList}>{usersList}</div>
        </div>
    )
}

const SettingsTabContent = () => {
    return (
        <div>
            <SimpleCell
                before={<Icon24ClockCircleDashedOutline />}
                subtitle="На один раунд будет даваться это количество времени"
                disabled
                multiline
                after={
                    <Select
                        value="left"
                        // onChange={(e) => setAlign(e.target.value)}
                        options={[
                            { label: "15 с.", value: "left" },
                            { label: "30 с.", value: "center" },
                            { label: "60 с.", value: "right" },
                        ]}
                    />
                }
            >
                Время раунда
            </SimpleCell>
        </div>
    )
}
