import { GameLobby, HistoryAlbumListItem } from "@components"
import {
    changeEpicVisibility,
    GamesEffects,
    Modals,
    panelNames,
    setSnackbar,
    useWebsocket,
} from "@shared"
import { IGameParticipant, IPanelProps, TGameHistoryStepType } from "@types"
import {
    Icon16CheckDoubleOutline,
    Icon20CheckAlt,
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
        userLeaved: (msg) => GamesEffects.History.deleteUser(msg),
        startLobby: () => GamesEffects.History.setStart(true),
        timerTick: ({ time }) => GamesEffects.History.setTime(time),
        nextStep: ({ previousContext }) =>
            GamesEffects.History.nextStep(previousContext),
        finishGame: () => GamesEffects.History.setGameStep("readyResult"),
        gameGif: ({ buffer }) => GamesEffects.History.setGifBuffer(buffer),
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
        const previousContext = useUnit(GamesEffects.History.$previousContext)
        const [meWriteValue, setMeWriteValue] = useState("")

        const progressPercent = ((time || 0) * 100) / 15

        return (
            <div>
                <div className={styles.topElementsContainer}>
                    <center>
                        <div style={{ fontWeight: "600" }}>
                            {step}/{users.length}
                        </div>
                        <div className={styles.readyUsersCount}>
                            <Icon16CheckDoubleOutline />
                            {step}/{users.length}
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
                    header="Напишите предложение"
                    style={{ paddingBottom: 0 }}
                />
                {previousContext && <p>{previousContext}</p>}
                <div className={styles.meWriteInputContainer}>
                    <Input
                        style={{ flex: 1 }}
                        type="text"
                        value={meWriteValue}
                        placeholder="Писать сюда если что"
                        onChange={(e) => setMeWriteValue(e.target.value)}
                    />

                    <Button
                        before={<Icon20CheckAlt />}
                        onClick={() => send("sendText", { text: meWriteValue })}
                    >
                        Готово
                    </Button>
                </div>
            </div>
        )
    }

    const GameStepReadyResult = () => {
        const gifContent = useUnit(GamesEffects.History.$gifContent)

        const photo = "https://i.playground.ru/e/tRXuCJPpLW_bZJ1IdfZknw.jpeg"

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
                                photos={[photo, photo, photo, photo, photo]}
                                size="l"
                                direction="column"
                            >
                                12 участников
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
                {gifContent && (
                    <>
                        <img src={gifContent} width={500} height={500} alt="" />
                        <a href={gifContent} download="t.gif">
                            <Button
                                size="l"
                                appearance="accent"
                                mode="tertiary"
                            >
                                Скачать
                            </Button>
                        </a>
                    </>
                )}
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
            console.log("download gif")
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
