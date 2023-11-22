import { HistoryAlbumListItem } from "@components"
import { GamesEffects } from "@shared"
import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"

export const HistoryChat = ({ root }: { root: number }) => {
    const [currentChatIndex, setCurrentChatIndex] = useState(1)
    const messages = useUnit(GamesEffects.History.$messages)
    const safeMessages = messages?.[root]?.msgs || []

    useEffect(() => {
        if (currentChatIndex < safeMessages.length) {
            const timer = setTimeout(() => {
                setCurrentChatIndex((prev) => prev + 1)
            }, 2500)

            return () => clearTimeout(timer)
        }
    }, [currentChatIndex])

    const album = safeMessages.slice(0, currentChatIndex).map((item) => (
        <div key={item.owner?.id} className={styles.albumContainer}>
            <HistoryAlbumListItem item={item} />
        </div>
    ))

    return <div className={styles.albumContainer}>{album}</div>
}
