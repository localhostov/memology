import { GameLobby, HistoryChat } from "@components"
import {
    $vkUserData,
    APP_ID,
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
    Icon24ArrowRightOutline,
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
    const currentChatRoot = useUnit(GamesEffects.History.$currentChatRoot)
    const [vkGifAttachment, setVkGifAttachment] = useState("")

    const { send } = useWebsocket(
        "history",
        {
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
            finishGame: (msg) => {
                GamesEffects.History.setMessages(msg.dialogs)
                GamesEffects.History.setGameStep("readyResult")
            },
            gameGif: ({ buffer, vkAttachment }) => {
                GamesEffects.History.setGifBuffer(buffer)
                setVkGifAttachment(vkAttachment)
            },
            readyCounter: (num) => GamesEffects.History.setReadyCount(num),
            newGame: () => {
                GamesEffects.History.setStart(false)
                GamesEffects.History.setGameStep("meWrite")
            },
            showDialog: ({ dialogId }) => {
                if (gameStep !== "showResult")
                    GamesEffects.History.setGameStep("showResult")
                GamesEffects.History.setChatRoot(dialogId)
            },
        },
        {
            onClose: () => {
                navigator.replace("/games")
                setSnackbar(
                    <Snackbar onClose={() => setSnackbar(null)}>
                        Лобби игры «История» больше не доступно
                    </Snackbar>,
                )
            },
        },
    )

    useEffect(() => {
        changeEpicVisibility(false)
        GamesEffects.History.setGameStep("meWrite")

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
            if (meWriteValue.length === 0) return
            GamesEffects.History.setIsReady()

            send("sendText", { text: meWriteValue })
        }

        useEffect(() => {
            setMeWriteValue("")
        }, [gameStep])

        useEffect(() => {
            if (step) {
                setMeWriteValue("")
            }
        }, [step, isStarted])

        useEffect(() => {
            if (time !== null && time === 1) {
                send("sendText", { text: meWriteValue })
            }
        }, [time])

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
            send("showDialog", { dialogId: 0 })
        }
        const roomOwner = users.find((it) => it.isOwner)

        return (
            <div>
                <Placeholder
                    icon={
                        <Icon20ChecksOutline
                            style={{ width: 56, height: 56 }}
                        />
                    }
                    header={
                        vkUserData?.id === roomOwner?.vkId
                            ? "Просмотр результата"
                            : "Ожидаем-с..."
                    }
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

                            {vkUserData?.id === roomOwner?.vkId && (
                                <Button
                                    before={<Icon24Play />}
                                    onClick={showGameResult}
                                >
                                    Начать
                                </Button>
                            )}
                        </div>
                    }
                >
                    {vkUserData?.id === roomOwner?.vkId
                        ? "Нажмите на кнопку ниже, чтобы начать просмотр результата"
                        : `Ждём, пока ${
                              roomOwner?.vkData.first_name ||
                              "создатель комнаты"
                          } запустит просмотр истории`}
                </Placeholder>
            </div>
        )
    }

    const GameStepShowResult = () => {
        const [nextActionIsLocked, setNextActionIsLocked] = useState(true)

        const messages = useUnit(GamesEffects.History.$messages)
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
            bridge.send("VKWebAppShowWallPostBox", {
                message: `Мемология - vk.com/app${APP_ID}`,
                attachments: vkGifAttachment,
            })
        }

        const shareOnStory = async () => {
            await bridge.send("VKWebAppShowStoryBox", {
                background_type: "image",
                url: `https://vk.com/doc-223365328_666051336`,
            })
        }

        const nextAction = () => {
            if ((messages?.length || 0) - 1 === currentChatRoot) {
                send("newGame", {})
            } else {
                setNextActionIsLocked(true)
                send("showDialog", {
                    dialogId: currentChatRoot + 1,
                })
            }
        }

        const onLastMessageShowed = () => {
            setNextActionIsLocked(false)
        }

        return (
            <div>
                <HistoryChat
                    root={currentChatRoot}
                    onLastMessageShowed={onLastMessageShowed}
                />

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

                    <Button
                        size="l"
                        before={
                            (messages?.length || 0) - 1 === currentChatRoot ? (
                                <Icon24Add />
                            ) : (
                                <Icon24ArrowRightOutline />
                            )
                        }
                        onClick={nextAction}
                        disabled={nextActionIsLocked}
                    >
                        {(messages?.length || 0) - 1 !== currentChatRoot
                            ? "Дальше"
                            : "Новая игра"}
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
