import {
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
    Icon32PollOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Group, Panel, PanelHeader } from "@vkontakte/vkui"
import { useList } from "effector-react"
import { useEffect } from "react"
import { $memesList, fetchMemes, panelNames } from "../shared"
import styles from "../styles/memes.module.css"
import { IPanelProps } from "../types"

export const Memes = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()

    useEffect(() => {
        fetchMemes()
    }, [])

    const openMeme = (id: number) => {
        navigator.push(`meme/${id}`)
    }

    const memesList = useList($memesList, (item) => (
        <div
            key={item.id}
            className={styles.card}
            onClick={() => openMeme(item.id)}
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
            </div>
        </div>
    ))

    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group style={{ padding: 16 }}>
                <div className={styles.cardsContainer}>{memesList}</div>
            </Group>
        </Panel>
    )
}
