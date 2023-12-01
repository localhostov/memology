import { Mark, MemeItem } from "@shared"
import {
    Icon20CommentOutline,
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { ReactNode } from "react"
import styles from "./styles.module.css"

export const MemeListItem = ({
    item,
    children = null,
    onClick = null,
}: {
    item: MemeItem
    children?: ReactNode | null
    onClick?: ((item: MemeItem) => void) | null
}) => {
    const navigator = useRouteNavigator()

    const openMeme = (memeId: number) => {
        navigator.push(`/meme/${memeId}`)
    }

    return (
        <div
            key={item.id}
            className={styles.card}
            onClick={() =>
                onClick !== null ? onClick(item) : openMeme(item.id)
            }
        >
            <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${item.image})` }}
            >
                <div className={styles.imageTextContainer}>
                    {item.isSuggest && (
                        <div className={styles.onModeration}>
                            На рассмотрении
                        </div>
                    )}

                    <div className={styles.mobileTitle}>{item.title}</div>
                </div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>{item.title}</div>
                <div className={styles.cardDescription}>{item.description}</div>

                <div style={{ minHeight: 8, flex: 1 }} />

                {children !== null ? (
                    children
                ) : (
                    <div className={styles.cardInfoBox}>
                        <div className={styles.countersContainer}>
                            <div
                                style={{
                                    background: item.isFavorites
                                        ? "var(--favorites-background-alpha)"
                                        : undefined,
                                }}
                            >
                                {item.isFavorites ? (
                                    <Icon28BookmarkCircleFillYellow
                                        style={{ width: 17, height: 17 }}
                                    />
                                ) : (
                                    <Icon28BookmarkOutline
                                        style={{ width: 17, height: 17 }}
                                    />
                                )}

                                {item.favoritesCount}
                            </div>

                            <div
                                style={{
                                    background:
                                        (item.mark !== undefined &&
                                            (item.mark === Mark.LIKE
                                                ? "var(--like-background-alpha)"
                                                : "var(--dislike-background-alpha)")) ||
                                        undefined,
                                }}
                            >
                                <Icon28ArrowUpRectangleOutline
                                    style={{
                                        width: 17,
                                        height: 17,
                                        color:
                                            (item.mark !== undefined &&
                                                (item.mark === Mark.LIKE
                                                    ? "var(--like-background)"
                                                    : "var(--dislike-background)")) ||
                                            undefined,
                                    }}
                                />
                                {item.likesCount}
                            </div>

                            <div>
                                <Icon20CommentOutline
                                    style={{ width: 17, height: 17 }}
                                />
                                {item.commentsCount}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
