import { MemeCommentListItem } from "@components"
import { $vkUserData, panelNames } from "@shared"
import { IPanelProps, TMemeMarkType } from "@types"
import {
    Icon24CommentOutline,
    Icon24ThumbsDown,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUp,
    Icon24ThumbsUpOutline,
} from "@vkontakte/icons"
import bridge, { UserInfo } from "@vkontakte/vk-bridge"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Avatar,
    Button,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
} from "@vkontakte/vkui"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import { useUnit } from "effector-react/compat"

export const Meme = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const [memeOwner, setMemeOwner] = useState<UserInfo | null>(null)
    // const [commentsUsers, setCommentsUsers] = useState<UserInfo[] | null>(null)
    const ownerVkUrl = `https://vk.com/id${memeOwner?.id}`
    const vkUserData = useUnit($vkUserData) // TODO: drop this line

    const getOwnerData = () => {
        bridge
            .send("VKWebAppGetUserInfo", {
                user_id: memeInfo.ownerId,
            })
            .then((data) => setMemeOwner(data))
    }

    const getCommentsUserDatas = () => {}

    useEffect(() => {
        getOwnerData()
        getCommentsUserDatas()
    }, [])

    const openImage = () => {
        bridge.send("VKWebAppShowImages", {
            images: [memeInfo.image],
        })
    }

    const handleFavoritesClick = () => {
        console.log("clicked on favorites")
    }

    const handleMark = (mark: TMemeMarkType) => {
        console.log(`user change mark to ${mark}`)
    }

    const openCommentModal = () => {
        navigator.push(`/meme/${memeInfo.id}/comment`)
    }

    const commentsList = mockedCommentsList.map((item) => (
        <div key={item.id}>
            <MemeCommentListItem item={item} userData={vkUserData} />
        </div>
    ))

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => navigator.back()} />}
            >
                {panelNames[id]}
            </PanelHeader>

            <Group>
                <div className={styles.imageContainer}>
                    <img
                        src={memeInfo.image}
                        className={styles.image}
                        onClick={openImage}
                        alt=""
                    />

                    <div>
                        <div className={styles.placeInRating}>
                            #1 в недельном рейтинге
                        </div>
                        <div className={styles.title}>{memeInfo.title}</div>
                        <div className={styles.description}>
                            {memeInfo.description}
                        </div>

                        <div style={{ height: 8 }} />

                        <div>
                            <SimpleCell
                                before={
                                    <Avatar
                                        size={36}
                                        src={memeOwner?.photo_200}
                                    />
                                }
                                style={{ paddingLeft: 0, borderRadius: 100 }}
                                subtitle="Автор мема"
                                onClick={() =>
                                    window.open(ownerVkUrl, "_blank")
                                }
                            >
                                {memeOwner?.first_name || "Загрузка..."}{" "}
                                {memeOwner?.last_name}
                            </SimpleCell>
                        </div>
                    </div>
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.actionsContainer}>
                        <div>
                            <div
                                onClick={() => handleMark("dislike")}
                                style={{ padding: 0, cursor: "pointer" }}
                            >
                                {memeInfo.myMark === "dislike" ? (
                                    <Icon24ThumbsDown />
                                ) : (
                                    <Icon24ThumbsDownOutline />
                                )}
                            </div>
                            16
                            <div
                                onClick={() => handleMark("like")}
                                style={{ padding: 0, cursor: "pointer" }}
                            >
                                {memeInfo.myMark === "like" ? (
                                    <Icon24ThumbsUp />
                                ) : (
                                    <Icon24ThumbsUpOutline />
                                )}
                            </div>
                        </div>

                        <div
                            onClick={handleFavoritesClick}
                            className={
                                memeInfo.isFavorites
                                    ? styles.favoritesCheck
                                    : styles.favorites
                            }
                        >
                            {memeInfo.favoritesCount}

                            <div className={styles.verticalDivider} />

                            {memeInfo.isFavorites
                                ? "В избранном"
                                : "В избранное"}
                        </div>
                    </div>
                </div>

                <div>
                    <SimpleCell
                        disabled
                        subtitle={`Всего: ${memeInfo.commentsCount}`}
                        before={<Icon24CommentOutline />}
                        after={
                            <Button
                                mode={"secondary"}
                                onClick={openCommentModal}
                            >
                                Комментировать
                            </Button>
                        }
                    >
                        Комментарии
                    </SimpleCell>

                    <div className={styles.horizontalDivider} />

                    <div className={styles.commentListContainer}>
                        {commentsList}
                    </div>
                </div>
            </Group>
        </Panel>
    )
}

const memeInfo: LocalMemeItem = {
    description:
        "Lorem ipsum dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor",
    favoritesCount: 10,
    id: 0,
    image: "https://www.neredeoku.com/gorsel/ankara/etimesgut/ozel-asfa-ankara-ferda-koleji-098e6f5ecae42c26a940ad4a6c7.jpg",
    isFavorites: true,
    likesCount: 0,
    title: "Some title meme",
    ownerId: 729565990,
    myMark: null,
    commentsCount: 100,
}

const mockedCommentsList: CommentItem[] = [
    {
        id: 0,
        text: "some comment text",
        senderId: 1,
        likes: 10,
        myMark: null,
        timestamp: +new Date(),
        userMemeMark: null,
    },
    {
        id: 1,
        text: "second looooooooooooooooooooooooooooooooooooooooooooooooooooooong comment text, it's really long text bro",
        senderId: 58755532,
        likes: 10,
        myMark: "like",
        timestamp: 1000,
        userMemeMark: "like",
    },

    {
        id: 1,
        text: "second loooooooooo oooooooooo  sdf as df adf a df a sdf as df as fd as fda sf as df as df as fd asdf a sfd as f as f asd fa sfdas dfsadfasdf as df asfasdfas dfa sfd asdf ooooooooooooo oooooooooooooooooooooong comment text, it's really long text bro",
        senderId: 58755532,
        likes: 10,
        myMark: "like",
        timestamp: 1000,
        userMemeMark: "dislike",
    },
]

interface LocalMemeItem {
    description: string
    favoritesCount: number
    id: number
    image: string
    isFavorites: boolean
    likesCount: number
    title: string
    ownerId: number
    myMark: TMemeMarkType | null
    commentsCount: number
}

export interface CommentItem {
    id: number
    text: string
    senderId: number
    likes: number
    myMark: TMemeMarkType | null
    timestamp: number
    userMemeMark: TMemeMarkType | null
}
