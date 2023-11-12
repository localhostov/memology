import {
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
} from "@vkontakte/icons"
import { MemeItem } from "../shared/proto/meme.ts"
import styles from "../styles/memeListItem.component.module.css"
import { ReactNode } from "react"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"

export const MemeListItem = ({
    item,
    children = null,
    onClick = null,
}: {
    item: MemeItem
    children?: ReactNode | null
    onClick?: ((id: number) => void) | null
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
                onClick !== null ? onClick(item.id) : openMeme(item.id)
            }
        >
            <img
                src={item.image}
                style={{ background: `url(${item.image})` }}
                className={styles.cardImage}
                alt=""
            />

            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>{item.title}</div>
                <div className={styles.cardDescription}>{item.description}</div>

                <div style={{ height: 8 }} />

                {children !== null ? (
                    children
                ) : (
                    <div className={styles.cardInfoBox}>
                        {/*{item.placeInRating > -1 ? (*/}
                        {/*    <div>*/}
                        {/*        <Icon32PollOutline*/}
                        {/*            style={{ width: 20, height: 20 }}*/}
                        {/*        />*/}
                        {/*        {item.placeInRating}*/}
                        {/*    </div>*/}
                        {/*) : (*/}
                        {/*    <div />*/}
                        {/*)}*/}

                        <div>
                            <div>
                                {item.isFavorites ? (
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
                )}
            </div>
        </div>
    )
}
