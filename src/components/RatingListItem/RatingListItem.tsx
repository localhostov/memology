import { Mark, TRatingItem } from "@shared"
import {
    Icon20CommentOutline,
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Tappable } from "@vkontakte/vkui"
import styles from "./styles.module.css"

export const RatingListItem = ({ item }: { item: TRatingItem }) => {
    const navigator = useRouteNavigator()
    const openMeme = () => {
        navigator.push(`/meme/${item.id}`)
    }

    return (
        <div key={item.id}>
            <Tappable
                className={styles.card}
                onClick={openMeme}
                hasActive={false}
                hasHover={false}
                style={{ cursor: "pointer" }}
            >
                <div>
                    <div
                        style={{ backgroundImage: `url(${item.image})` }}
                        className={styles.memeImage}
                    >
                        <div className={styles.place}>{item.place}</div>
                    </div>
                </div>

                <div className={styles.memeInfoContainer}>
                    <div className={styles.memeTitle}>{item.title}</div>
                    <div className={styles.memeDescription}>
                        {item.description}
                    </div>

                    <div style={{ height: 8 }} />

                    <div className={styles.memeInfoCounters}>
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
            </Tappable>
        </div>
    )
}
