import {
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Tappable } from "@vkontakte/vkui"
import { RatingItem } from "../../panels"
import styles from "./styles.module.css"

export const RatingListItem = ({
    item,
    place,
}: {
    item: RatingItem
    place: number
}) => {
    const navigator = useRouteNavigator()
    const openMeme = () => {
        navigator.push(`/meme/${item.id}`)
    }

    return (
        <div key={item.id}>
            <Tappable className={styles.card} onClick={openMeme}>
                <div>
                    <img
                        src={item.image}
                        style={{ background: `url(${item.image})` }}
                        className={styles.memeImage}
                        alt=""
                    />

                    <div className={styles.place}>{place}</div>
                </div>

                <div className={styles.memeInfoContainer}>
                    <div className={styles.memeTitle}>{item.title}</div>
                    <div className={styles.memeDescription}>
                        {item.description}
                    </div>

                    <div style={{ height: 8 }} />

                    <div className={styles.memeInfoCounters}>
                        <div>
                            {item.inFavorites ? (
                                <Icon28BookmarkCircleFillYellow
                                    style={{ width: 20, height: 20 }}
                                />
                            ) : (
                                <Icon28BookmarkOutline
                                    style={{ width: 20, height: 20 }}
                                />
                            )}

                            {item.favoritesCount}
                        </div>

                        <div>
                            <Icon28ArrowUpRectangleOutline
                                style={{ width: 20, height: 20 }}
                            />
                            {item.likesCount}
                        </div>
                    </div>
                </div>
            </Tappable>
        </div>
    )
}
