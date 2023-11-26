import {
    $vkUserData,
    WebsocketServer_HistoryEvents_FinishGame_Msg,
} from "@shared"
import { Avatar } from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"

function AutoplayTTS({ text }: { text: string }) {
    useEffect(() => {
        if ("SpeechSynthesisUtterance" in window) {
            const msg = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(msg)
        }
    }, [text])

    return <div>{text}</div>
}

export const HistoryAlbumListItem = ({
    item,
    onEndMessageLoading,
}: {
    item: WebsocketServer_HistoryEvents_FinishGame_Msg
    onEndMessageLoading: (ownerId: number) => void
}) => {
    const vkUserData = useUnit($vkUserData)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true) // if item changed from 2+ root
        const timer = setTimeout(() => {
            setIsLoading(false)
            onEndMessageLoading(item.owner?.id || -1)
        }, 1500)

        return () => clearInterval(timer)
    }, [item])

    return (
        <div className={styles.container}>
            <Avatar size={40} src={item.owner?.photo} />
            <div>
                <div className={styles.username}>
                    {item.owner?.name}
                    <div style={{ height: 8 }} />
                </div>

                <div
                    className={styles.bubble}
                    style={{
                        background: isLoading
                            ? "none"
                            : vkUserData?.id === item.owner?.id
                              ? "var(--vkui--color_accent_blue)"
                              : "var(--vkui--color_background_secondary)",
                        color:
                            vkUserData?.id === item.owner?.id
                                ? "white"
                                : "--vkui--color_text_primary",
                        fontStyle:
                            item.text.trim().length > 0 ? "normal" : "italic",
                    }}
                >
                    {isLoading ? (
                        <div className={styles.loading} />
                    ) : (
                        <AutoplayTTS text={item.text} />
                    )}
                </div>
            </div>
        </div>
    )
}
