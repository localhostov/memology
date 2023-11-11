import {
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Group,
    Panel,
    PanelHeader,
    Platform,
    Search,
    usePlatform,
} from "@vkontakte/vkui"
import { useList } from "effector-react"
import { ChangeEvent, useEffect, useState } from "react"
import { $memesList, fetchMemes, panelNames } from "../shared"
import styles from "../styles/memes.module.css"
import { IPanelProps } from "../types"

export const Memes = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const platform = usePlatform()

    const [search, setSearch] = useState("")
    const [searchedItems, setSearchedItems] = useState([])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

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

    const searchStyles =
        platform === Platform.VKCOM
            ? { paddingLeft: 0, paddingRight: 0 }
            : undefined

    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group style={{ padding: 16 }}>
                <Search
                    value={search}
                    onChange={onChange}
                    after={null}
                    style={searchStyles}
                />

                {search.trim().length > 0 ? (
                    searchedItems.length === 0 ? (
                        <div>нихуя не нашел</div>
                    ) : (
                        <div>дохуя че нашел</div>
                    )
                ) : (
                    <div className={styles.cardsContainer}>{memesList}</div>
                )}
            </Group>
        </Panel>
    )
}
