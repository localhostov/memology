import { HistoryChat } from "@components"
import { $vkUserData, APP_ID, GamesEffects, Modals, setSnackbar } from "@shared"
import { TSendFunction } from "@types"
import {
    Icon24Add,
    Icon24AdvertisingOutline,
    Icon24ArrowRightOutline,
    Icon24StoryReplyOutline,
    Icon28GifOutline,
} from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, ButtonGroup, Snackbar } from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { useState } from "react"
import styles from "../styles.module.css"

interface IProps {
    send: TSendFunction<"history">
}

export function ShowResult({ send }: IProps) {
    const navigator = useRouteNavigator()
    const messages = useUnit(GamesEffects.History.$messages)
    const currentChatRoot = useUnit(GamesEffects.History.$currentChatRoot)
    const users = useUnit(GamesEffects.History.$users)
    const gifs = useUnit(GamesEffects.History.$gifContent)
    const vkUserData = useUnit($vkUserData)
    const [allMessagesShowed, setAllMessagesShowed] = useState(false)
    const gifContent = gifs.find((x) => x.dialogId === currentChatRoot)
    const gameOwner = users.find((it) => it.isOwner)

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
        if (!gifContent) return

        bridge.send("VKWebAppShowWallPostBox", {
            message: `Мемология - vk.com/app${APP_ID}`,
            attachments: gifContent.vkAttachment,
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
            setAllMessagesShowed(false)
            send("showDialog", {
                dialogId: currentChatRoot + 1,
            })
        }
    }

    const onLastMessageShowed = () => {
        setAllMessagesShowed(true)
    }

    return (
        <div>
            <HistoryChat
                root={currentChatRoot}
                onLastMessageShowed={onLastMessageShowed}
            />

            {allMessagesShowed && (
                <>
                    <div style={{ height: 16 }} />

                    <div className={styles.partableDividerContainer}>
                        <div className={styles.dividerPart} />
                        <div className={styles.partableDividerText}>
                            Конец прeкрасной истории
                        </div>
                        <div className={styles.dividerPart} />
                    </div>

                    <div style={{ height: 16 }} />
                </>
            )}

            <ButtonGroup gap="s" align="center" stretched>
                {allMessagesShowed && (
                    <>
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
                    </>
                )}

                {vkUserData?.id === gameOwner?.vkId && (
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
                        disabled={!allMessagesShowed}
                    >
                        {(messages?.length || 0) - 1 !== currentChatRoot
                            ? "Дальше"
                            : "Новая игра"}
                    </Button>
                )}
            </ButtonGroup>

            <div style={{ height: 16 }} />
        </div>
    )
}
