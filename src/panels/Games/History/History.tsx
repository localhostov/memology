import { GameLobby } from "@components"
import { changeEpicVisibility, Modals, panelNames } from "@shared"
import { IPanelProps } from "@types"
import {
    Icon20CheckAlt,
    Icon20ChecksOutline,
    Icon24Play,
    Icon28PencilSquare,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    Group,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    UsersStack,
} from "@vkontakte/vkui"
import { ReactElement, useEffect, useState } from "react"
import styles from "./styles.module.css"

type TGameStepType = "meWrite" | "readyResult"

export const HistoryGame = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const [gameIsStarted, setGameIsStarted] = useState(false)
    const [gameStep, setGameStep] = useState<TGameStepType>("meWrite")
    const [counter, setCounter] = useState(1)
    const [meWriteValue, setMeWriteValue] = useState("")

    useEffect(() => {
        changeEpicVisibility(false)

        return () => {
            changeEpicVisibility(true)
        }
    }, [])

    const startGame = () => {
        setGameIsStarted(true)
    }

    const GameStepMeWrite = () => {
        return (
            <div>
                <div className={styles.topElementsContainer}>
                    <div>{counter}/1</div>
                    <div>12 секунд</div>
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
                        onClick={() => setGameStep("readyResult")}
                    >
                        Готово
                    </Button>
                </div>
            </div>
        )
    }

    const GameStepShowResult = () => {
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
                {gameIsStarted ? (
                    <div className={styles.container}>
                        {currentGameStep[gameStep]}
                    </div>
                ) : (
                    <GameLobby onStartGame={startGame} />
                )}
            </Group>
        </Panel>
    )
}
