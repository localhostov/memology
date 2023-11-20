import { GameLobby } from "@components"
import {
    changeEpicVisibility,
    GamesEffects,
    Modals,
    panelNames,
    setSnackbar,
    useWebsocket,
} from "@shared"
import { IGameParticipant, IPanelProps } from "@types"
import {
    Icon20CheckAlt,
    Icon20ChecksOutline,
    Icon24LinkedOutline,
    Icon24Play,
    Icon28DownloadOutline,
    Icon28PencilSquare,
} from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    Group,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Snackbar,
    UsersStack,
} from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { ReactElement, useEffect, useState } from "react"
import styles from "./styles.module.css"

type TGameStepType = "meWrite" | "readyResult"

export const HistoryGame = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const isStarted = useUnit(GamesEffects.History.$isStarted)
    const users = useUnit(GamesEffects.History.$users)
    const gifContent = useUnit(GamesEffects.History.$gifContent)
    const [gameStep, setGameStep] = useState<TGameStepType>("meWrite")

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
                <Snackbar
                    onClose={() => setSnackbar(null)}
                    before={
                        <Icon24LinkedOutline fill="var(--vkui--color_icon_positive)" />
                    }
                >
                    {msg.message}
                </Snackbar>,
            ),
        startLobby: () => GamesEffects.History.setStart(true),
        timerTick: ({ time }) => GamesEffects.History.setTime(time),
        nextStep: () => GamesEffects.History.nextStep(),
        finishGame: () => setGameStep("readyResult"),
        gameGif: ({ buffer }) => GamesEffects.History.setGifBuffer(buffer),
    })

    useEffect(() => {
        changeEpicVisibility(false)

        return () => {
            changeEpicVisibility(true)
            if (gifContent) URL.revokeObjectURL(gifContent)
        }
    }, [])

    const GameStepMeWrite = () => {
        const time = useUnit(GamesEffects.History.$time)
        const step = useUnit(GamesEffects.History.$historyStep)
        const [meWriteValue, setMeWriteValue] = useState("")

        return (
            <div>
                <div className={styles.topElementsContainer}>
                    <div>
                        {step}/{users.length}
                    </div>
                    <div>{time} секунд</div>
                </div>

                <Placeholder
                    icon={
                        <Icon28PencilSquare style={{ width: 56, height: 56 }} />
                    }
                    header="Напишите предложение"
                    style={{ paddingBottom: 0 }}
                />

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

    const GameStepShowResult = () => {
        const gifContent = useUnit(GamesEffects.History.$gifContent)

        const photo = "https://i.playground.ru/e/tRXuCJPpLW_bZJ1IdfZknw.jpeg"
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

                            <Button before={<Icon24Play />}>Начать</Button>
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
                                before={<Icon28DownloadOutline />}
                            >
                                Скачать
                            </Button>
                        </a>
                    </>
                )}
            </div>
        )
    }

    const currentGameStep: Record<TGameStepType, ReactElement> = {
        meWrite: GameStepMeWrite(),
        readyResult: GameStepShowResult(),
    }

    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderBack
                        onClick={() =>
                            navigator.showModal(
                                Modals.EXIT_FROM_GAME_CONFIRMATION,
                            )
                        }
                    />
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
