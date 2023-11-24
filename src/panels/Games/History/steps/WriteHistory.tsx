import { GamesEffects } from "@shared"
import { TSendFunction } from "@types"
import {
    Icon16CheckDoubleOutline,
    Icon16Clear,
    Icon28PencilSquare,
} from "@vkontakte/icons"
import {
    Button,
    IconButton,
    Input,
    Placeholder,
    Progress,
} from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import styles from "../styles.module.css"

interface IProps {
    send: TSendFunction<"history">
}

export function WriteHistory({ send }: IProps) {
    const time = useUnit(GamesEffects.History.$time)
    const step = useUnit(GamesEffects.History.$historyStep)
    const readyCount = useUnit(GamesEffects.History.$readyCounter)
    const previousContext = useUnit(GamesEffects.History.$previousContext)
    const gameStep = useUnit(GamesEffects.History.$gameStep)
    const users = useUnit(GamesEffects.History.$users)
    const isStarted = useUnit(GamesEffects.History.$isStarted)
    const isReady = useUnit(GamesEffects.History.$isReady)
    const [meWriteValue, setMeWriteValue] = useState("")

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
                icon={<Icon28PencilSquare style={{ width: 56, height: 56 }} />}
                header={
                    step === users.length
                        ? "Завершите эту историю"
                        : previousContext
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

            <div style={{ height: 16 }} />

            <div className={styles.meWriteInputContainer}>
                <Input
                    style={{ flex: 1 }}
                    type="text"
                    disabled={isReady}
                    value={meWriteValue}
                    placeholder="Ондажды..."
                    onChange={(e) => setMeWriteValue(e.target.value)}
                    after={
                        meWriteValue.length > 0 && (
                            <IconButton
                                hoverMode="opacity"
                                aria-label="Очистить поле"
                                onClick={() => setMeWriteValue("")}
                            >
                                <Icon16Clear />
                            </IconButton>
                        )
                    }
                />

                <Button
                    onClick={ready}
                    size="l"
                    mode={isReady ? "secondary" : "primary"}
                    disabled={meWriteValue.trim().length === 0}
                >
                    {isReady ? "Изменить" : "Готово"}
                </Button>
            </div>
        </div>
    )
}
