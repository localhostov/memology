import {
    $vkUserData,
    WebsocketServer_HistoryEvents_FinishGame_Msg,
} from "@shared"
import { Avatar } from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"

export const HistoryAlbumListItem = ({
    item,
}: {
    item: WebsocketServer_HistoryEvents_FinishGame_Msg
}) => {
    const vkUserData = useUnit($vkUserData)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearInterval(timer)
    }, [])

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
                    }}
                >
                    {isLoading ? <div className={styles.loading} /> : item.text}
                </div>
            </div>
        </div>
    )
}
