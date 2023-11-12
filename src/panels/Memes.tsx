import {
    Icon16Dropdown,
    Icon28AddCircleOutline,
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
    Icon28SadFaceOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    PanelHeaderContext,
    Placeholder,
    Search,
    SimpleCell,
    Spinner,
} from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { ChangeEvent, useEffect, useState } from "react"
import {
    $memesList,
    $memesSearch,
    fetchMemes,
    getMemesListFx,
    panelNames,
    routes,
    searchMeme,
} from "../shared"
import styles from "../styles/memes.module.css"
import { IPanelProps } from "../types"

export const Memes = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const memes = useUnit($memesList)
    const search = useUnit($memesSearch)
    const isLoading = useUnit(getMemesListFx.pending)
    const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        searchMeme(e.target.value)
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

    return (
        <Panel id={id}>
            <PanelHeader>
                <PanelHeaderContent
                    aside={
                        <Icon16Dropdown
                            style={{
                                transform: `rotate(${
                                    contextMenuIsOpen ? "180deg" : "0"
                                })`,
                                transition: "0.3s all ease",
                            }}
                        />
                    }
                    onClick={() => setContextMenuIsOpen(true)}
                >
                    {panelNames[id]}
                </PanelHeaderContent>
            </PanelHeader>
            <PanelHeaderContext
                opened={contextMenuIsOpen}
                onClose={() => setContextMenuIsOpen(false)}
            >
                <SimpleCell
                    before={<Icon28AddCircleOutline />}
                    onClick={() => navigator.push(routes.root.memes.suggest)}
                >
                    Предложить свой мем
                </SimpleCell>
            </PanelHeaderContext>

            <Group style={{ padding: 16 }}>
                <Search
                    value={search}
                    onChange={onChange}
                    after={null}
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    placeholder="Поиск мемов"
                />

                {isLoading ? (
                    <Spinner size="medium" style={{ margin: "20px 0" }} />
                ) : memes.length > 0 ? (
                    <div className={styles.cardsContainer}>{memesList}</div>
                ) : (
                    <Placeholder
                        icon={
                            <Icon28SadFaceOutline
                                style={{ width: 86, height: 86 }}
                            />
                        }
                        header="Ничего не найдено"
                        action={<Button>Предложить мем</Button>}
                    >
                        Похоже, у нас ещё нет ничего об этом меме. Но вы можете
                        предложить этот мем и мы обязательно его добавим
                    </Placeholder>
                )}
            </Group>
        </Panel>
    )
}
