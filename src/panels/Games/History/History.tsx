import { GameLobby, HistoryAlbumListItem } from "@components"
import {
    $vkUserData,
    changeEpicVisibility,
    declOfNum,
    GamesEffects,
    Modals,
    panelNames,
    setSnackbar,
    useWebsocket,
} from "@shared"
import { IGameParticipant, IPanelProps, TGameHistoryStepType } from "@types"
import {
    Icon16CheckDoubleOutline,
    Icon20ChecksOutline,
    Icon24Add,
    Icon24AdvertisingOutline,
    Icon24Play,
    Icon24StoryReplyOutline,
    Icon28GifOutline,
    Icon28PencilSquare,
} from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    ButtonGroup,
    Group,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Progress,
    Snackbar,
    UsersStack,
} from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { ReactElement, useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"

export const HistoryGame = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const isStarted = useUnit(GamesEffects.History.$isStarted)
    const users = useUnit(GamesEffects.History.$users)
    const gifContent = useUnit(GamesEffects.History.$gifContent)
    const gameStep = useUnit(GamesEffects.History.$gameStep)
    const vkUserData = useUnit($vkUserData)
    const unblock = useRef<() => void>()

    const { send } = useWebsocket("history", {
        lobbyInfo: async (msg) => {
            // TODO: place in effects
            const result: IGameParticipant[] = []

            for await (const user of msg.users) {
                const vkData = await bridge.send("VKWebAppGetUserInfo", {
                    user_id: user.vkId,
                })

                result.push(Object.assign(user, { vkData }))
            }

            GamesEffects.History.addUser(result)
        },
        showSnackbar: (msg) =>
            setSnackbar(
                <Snackbar onClose={() => setSnackbar(null)}>
                    {msg.message}
                </Snackbar>,
            ),
        userJoined: async (msg) => {
            const vkData = await bridge.send("VKWebAppGetUserInfo", {
                user_id: msg.vkId,
            })

            GamesEffects.History.addUser([Object.assign(msg, { vkData })])
        },
        userLeaved: (msg) => {
            GamesEffects.History.deleteUser(msg)

            if (msg.vkId === vkUserData?.id) {
                navigator.replace("/games")
                setSnackbar(
                    <Snackbar onClose={() => setSnackbar(null)}>
                        Вы были исключены из этой комнаты
                    </Snackbar>,
                )
            }
        },
        startLobby: () => GamesEffects.History.setStart(true),
        timerTick: ({ time }) => GamesEffects.History.setTime(time),
        nextStep: ({ previousContext }) =>
            GamesEffects.History.nextStep(previousContext),
        finishGame: () => GamesEffects.History.setGameStep("readyResult"),
        gameGif: ({ buffer }) => GamesEffects.History.setGifBuffer(buffer),
        readyCounter: (num) => GamesEffects.History.setReadyCount(num),
    })

    useEffect(() => {
        changeEpicVisibility(false)

        return () => {
            changeEpicVisibility(true)
            if (gifContent) URL.revokeObjectURL(gifContent)
        }
    }, [])

    useEffect(() => {
        unblock.current = navigator.block(() => false)
    }, [navigator])

    const GameStepMeWrite = () => {
        const time = useUnit(GamesEffects.History.$time)
        const step = useUnit(GamesEffects.History.$historyStep)
        const readyCount = useUnit(GamesEffects.History.$readyCounter)
        const previousContext = useUnit(GamesEffects.History.$previousContext)
        const [meWriteValue, setMeWriteValue] = useState("")
        const isReady = useUnit(GamesEffects.History.$isReady)

        const progressPercent = ((time || 0) * 100) / 15

        const ready = () => {
            GamesEffects.History.setIsReady()

            send("sendText", { text: meWriteValue })
        }

        useEffect(() => {
            if (previousContext) {
                setMeWriteValue("")
            }
        }, [previousContext])

        return (
            <div>
                <div className={styles.topElementsContainer}>
                    <center>
                        <div style={{ fontWeight: "600" }}>
                            {step}/{users.length}
                        </div>
                        <div className={styles.readyUsersCount}>
                            <Icon16CheckDoubleOutline />
                            {readyCount}/{users.length}
                        </div>
                    </center>

                    <div className={styles.progressContainer}>
                        <center>{time}</center>
                        <Progress
                            aria-labelledby="progresslabel"
                            value={progressPercent}
                            style={{
                                borderRadius: 100,
                                height: 6,
                                overflow: "hidden",
                            }}
                            appearance={
                                progressPercent > 50 ? "positive" : "negative"
                            }
                        />
                    </div>
                </div>

                <Placeholder
                    icon={
                        <Icon28PencilSquare style={{ width: 56, height: 56 }} />
                    }
                    header={
                        previousContext
                            ? "Продолжите эту историю"
                            : "Начните писать историю"
                    }
                    style={{ paddingBottom: 0 }}
                />

                {previousContext && (
                    <>
                        <div style={{ height: 16 }} />
                        <div className={styles.previousContextContainer}>
                            <div className={styles.previousContextBubble}>
                                {previousContext}
                            </div>
                        </div>
                    </>
                )}

                <div className={styles.meWriteInputContainer}>
                    <Input
                        style={{ flex: 1 }}
                        type="text"
                        disabled={isReady}
                        value={meWriteValue}
                        placeholder="Писать сюда если что"
                        onChange={(e) => setMeWriteValue(e.target.value)}
                    />

                    <Button
                        onClick={ready}
                        size="l"
                        mode={isReady ? "secondary" : "primary"}
                    >
                        {isReady ? "Изменить" : "Готово"}
                    </Button>
                </div>
            </div>
        )
    }

    const GameStepReadyResult = () => {
        const showGameResult = () => {
            GamesEffects.History.setGameStep("showResult")
        }

        return (
            <div>
                <Placeholder
                    icon={
                        <Icon20ChecksOutline
                            style={{ width: 56, height: 56 }}
                        />
                    }
                    header="Просмотр результата"
                    action={
                        <div>
                            <UsersStack
                                photos={users.map((it) => it.vkData.photo_200)}
                                size="l"
                                direction="column"
                            >
                                {declOfNum(
                                    users.length,
                                    ["участник", "участника", "участников"],
                                    true,
                                )}
                            </UsersStack>

                            <div style={{ height: 16 }} />

                            <Button
                                before={<Icon24Play />}
                                onClick={showGameResult}
                            >
                                Начать
                            </Button>
                        </div>
                    }
                >
                    Нажмите на кнопку ниже, чтобы начать просмотр результата
                </Placeholder>
            </div>
        )
    }

    const GameStepShowResult = () => {
        const album = mockedAlbum.map((item) => (
            <div key={item.vkId} className={styles.albumContainer}>
                <HistoryAlbumListItem item={item} />
            </div>
        ))

        const downloadGIF = () => {
            if (gifContent) {
                navigator.showModal(Modals.HISTORY_GIF_PREVIEW)
            } else {
                setSnackbar(
                    <Snackbar onClose={() => setSnackbar(null)}>
                        GIF-файл ещё не был создан, подождите
                    </Snackbar>,
                )
            }
        }

        const shareOnWall = () => {
            console.log("share on wall")
        }

        const shareOnStory = () => {
            console.log("share on story")
        }

        const newGame = () => {
            console.log("new game")
        }

        return (
            <div>
                <div className={styles.albumContainer}>{album}</div>

                <div style={{ height: 16 }} />

                <div className={styles.partableDividerContainer}>
                    <div className={styles.dividerPart} />
                    <div className={styles.partableDividerText}>
                        Конец прeкрасной истории
                    </div>
                    <div className={styles.dividerPart} />
                </div>

                <div style={{ height: 16 }} />

                <ButtonGroup gap="s" align="center" stretched>
                    <Button
                        before={
                            <Icon28GifOutline
                                style={{ width: 24, height: 24 }}
                            />
                        }
                        size="l"
                        mode="secondary"
                        onClick={downloadGIF}
                    />

                    <Button
                        before={<Icon24AdvertisingOutline />}
                        size="l"
                        mode="secondary"
                        onClick={shareOnWall}
                    />

                    <Button
                        before={<Icon24StoryReplyOutline />}
                        size="l"
                        mode="secondary"
                        onClick={shareOnStory}
                    />

                    <Button size="l" before={<Icon24Add />} onClick={newGame}>
                        Новая игра
                    </Button>
                </ButtonGroup>

                <div style={{ height: 16 }} />
            </div>
        )
    }

    const currentGameStep: Record<TGameHistoryStepType, ReactElement> = {
        meWrite: GameStepMeWrite(),
        readyResult: GameStepReadyResult(),
        showResult: GameStepShowResult(),
    }

    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    !isStarted && (
                        <PanelHeaderBack
                            onClick={() =>
                                navigator.showModal(
                                    Modals.EXIT_FROM_GAME_CONFIRMATION,
                                )
                            }
                        />
                    )
                }
            >
                {panelNames[id]}
            </PanelHeader>

            <Group>
                {isStarted ? (
                    <div className={styles.container}>
                        {currentGameStep[gameStep]}
                    </div>
                ) : (
                    <GameLobby send={send} />
                )}
            </Group>
        </Panel>
    )
}

const mockedAlbum: IAlbumItem[] = [
    {
        phrase: "Синий кит пьет кефир",
        vkId: 1,
    },
    {
        phrase: "Я не александр локалхостов",
        vkId: 729565990,
    },
    {
        phrase: "БЛяяяя аыф а ыав фы вафывафыв а фыва фыва фвыа фыпривет как дела выаф ываф а ы выаф ываф а ывыаф ываф а ы выаф ываф а ы выаф ываф а ы",
        vkId: 15,
    },
]

export interface IAlbumItem {
    phrase: string
    vkId: number
}
