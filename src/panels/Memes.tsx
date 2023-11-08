import {
    Icon28ArrowUpRectangleOutline,
    Icon28BookmarkCircleFillYellow,
    Icon28BookmarkOutline,
    Icon32PollOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Group, Panel, PanelHeader } from "@vkontakte/vkui"
import { Panels } from "../shared"
import styles from "../styles/memes.module.css"

export const Memes = ({ id }: Props) => {
    const navigator = useRouteNavigator()

    const openMeme = (id: number) => {
        navigator.push(`meme/${id}`)
    }

    const renderMemesList = mockMemesList.map((item: MemeItem, index) => {
        return (
            <div
                key={`card-${index}`}
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
                    <div className={styles.cardDescription}>
                        {item.description}
                    </div>

                    <div style={{ height: 8 }} />

                    <div className={styles.cardInfoBox}>
                        {item.placeInRating > -1 ? (
                            <div>
                                <Icon32PollOutline
                                    style={{ width: 20, height: 20 }}
                                />{" "}
                                {item.placeInRating}
                            </div>
                        ) : (
                            <div />
                        )}

                        <div>
                            <div>
                                {item.inMyBookmarks ? (
                                    <Icon28BookmarkCircleFillYellow
                                        style={{ width: 20, height: 20 }}
                                    />
                                ) : (
                                    <Icon28BookmarkOutline
                                        style={{ width: 20, height: 20 }}
                                    />
                                )}

                                {item.bookmarks}
                            </div>

                            <div>
                                <Icon28ArrowUpRectangleOutline
                                    style={{ width: 20, height: 20 }}
                                />
                                {item.bookmarks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <Panel id={id}>
            <PanelHeader>{Panels.MEMES_NAME}</PanelHeader>

            <Group style={{ padding: 16 }}>
                <div className={styles.cardsContainer}>{renderMemesList}</div>
            </Group>
        </Panel>
    )
}

interface Props {
    id: string
}

const mockMemesList: MemeItem[] = [
    {
        id: 1,
        title: "Название мема",
        rating: 10,
        image: "https://image.winudf.com/v2/image1/Y29tLndhbGxwYXBlci53YWxscGFwZXJzLkFsbE1lbWVzQW5kVHJvbGxTYXJjYXNtUGljc1dhbGxwYXBlcnNhbmRCYWNrZ3JvdW5kc19zY3JlZW5fMTBfMTYwMDEwMTE4Nl8wNzg/screen-6.jpg?fakeurl=1&type=.jpg",
        description:
            "Lorem ipsum dolor asdf asdf as df adfjkasdkjfkjasdf asf askfkaskfk asdfkaskdfasdfaksdfd",
        bookmarks: 10,
        placeInRating: 10,
        inMyBookmarks: true,
        likes: 0,
    },
    {
        id: 2,
        title: "2nd meme",
        rating: 10,
        image: "https://image.winudf.com/v2/image1/Y29tLndhbGxwYXBlci53YWxscGFwZXJzLkFsbE1lbWVzQW5kVHJvbGxTYXJjYXNtUGljc1dhbGxwYXBlcnNhbmRCYWNrZ3JvdW5kc19zY3JlZW5fMTBfMTYwMDEwMTE4Nl8wNzg/screen-6.jpg?fakeurl=1&type=.jpg",
        description:
            "Lorem ipsum dolor asdf asdf as df adfjkasdkjfkjasdf asf askfkaskfk asdfkaskdfasdfaksdfd",
        bookmarks: 0,
        placeInRating: -1,
        inMyBookmarks: false,
        likes: 10,
    },
    {
        id: 3,
        title: "2nd  в аы ва ыва ы а вафвфывафываыа",
        rating: 10,
        image: "https://image.winudf.com/v2/image1/Y29tLndhbGxwYXBlci53YWxscGFwZXJzLkFsbE1lbWVzQW5kVHJvbGxTYXJjYXNtUGljc1dhbGxwYXBlcnNhbmRCYWNrZ3JvdW5kc19zY3JlZW5fMTBfMTYwMDEwMTE4Nl8wNzg/screen-6.jpg?fakeurl=1&type=.jpg",
        description:
            "Lorem ipsum dolor asdf asdf as df adfjkasdkjfkjasdf asf askfkaskfk asdfkaskdfasdfaksdfd666",
        bookmarks: 1,
        placeInRating: 5,
        inMyBookmarks: true,
        likes: 9,
    },
    {
        id: 4,
        title: "2nd meme",
        rating: 10,
        image: "https://image.winudf.com/v2/image1/Y29tLndhbGxwYXBlci53YWxscGFwZXJzLkFsbE1lbWVzQW5kVHJvbGxTYXJjYXNtUGljc1dhbGxwYXBlcnNhbmRCYWNrZ3JvdW5kc19zY3JlZW5fMTBfMTYwMDEwMTE4Nl8wNzg/screen-6.jpg?fakeurl=1&type=.jpg",
        description:
            "Lorem ipsum dolor asdf asdf as df adfjkasdkjfkjasdf asf askfkaskfk asdfkaskdfasdfaksdfd",
        bookmarks: 60,
        placeInRating: -1,
        inMyBookmarks: false,
        likes: 666,
    },
]

interface MemeItem {
    id: number
    title: string
    rating: number
    image: string
    description: string
    bookmarks: number
    placeInRating: number
    inMyBookmarks: boolean
    likes: number
}
