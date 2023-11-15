import { MemeCommentListItem } from "@components"
import {
    $comments,
    $meme,
    $vkUserData,
    addToList,
    fetchMeme,
    Mark,
    panelNames,
    unmountMeme,
} from "@shared"
import { IPanelProps } from "@types"
import {
    Icon24CommentOutline,
    Icon24ThumbsDown,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUp,
    Icon24ThumbsUpOutline,
} from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Avatar,
    Button,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
} from "@vkontakte/vkui"
import { useList } from "effector-react"
import { useUnit } from "effector-react/compat"
import { useEffect } from "react"
import styles from "./styles.module.css"

export const Meme = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const meme = useUnit($meme)
    const ownerVkUrl = `https://vk.com/id${meme?.owner.id}`
    const vkUserData = useUnit($vkUserData) // TODO: drop this line
    const { memeId } = useParams<"memeId">()!

    useEffect(() => {
        fetchMeme(Number(memeId!))

        return unmountMeme
    }, [memeId])

    const openImage = () => {
        if (!meme) return
        bridge.send("VKWebAppShowImages", {
            images: [meme.image],
        })
    }

    const openCommentModal = () => {
        navigator.push(`/meme/${meme?.id}/comment`)
    }

    const commentsList = useList($comments, (item) => (
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

            {meme && (
                <Group>
                    <div className={styles.imageContainer}>
                        <img
                            src={meme.image}
                            className={styles.image}
                            onClick={openImage}
                            alt=""
                        />

                        <div>
                            <div className={styles.placeInRating}>
                                #1 в недельном рейтинге
                            </div>
                            <div className={styles.title}>{meme.title}</div>
                            <div className={styles.description}>
                                {meme.description}
                            </div>

                            <div style={{ height: 8 }} />

                            <div>
                                <SimpleCell
                                    before={
                                        <Avatar
                                            size={36}
                                            src={meme.owner.photo_200}
                                        />
                                    }
                                    style={{
                                        paddingLeft: 0,
                                        borderRadius: 100,
                                    }}
                                    subtitle="Автор мема"
                                    onClick={() =>
                                        window.open(ownerVkUrl, "_blank")
                                    }
                                >
                                    {meme.owner.first_name || "Загрузка..."}
                                    {" " + meme.owner.last_name}
                                </SimpleCell>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainContent}>
                        <div className={styles.actionsContainer}>
                            <div>
                                <div
                                    onClick={() => addToList(Mark.DISLIKE)}
                                    style={{ padding: 0, cursor: "pointer" }}
                                >
                                    {meme.mark === Mark.DISLIKE ? (
                                        <Icon24ThumbsDown />
                                    ) : (
                                        <Icon24ThumbsDownOutline />
                                    )}
                                </div>
                                {meme.likesCount}
                                <div
                                    onClick={() => addToList(Mark.LIKE)}
                                    style={{ padding: 0, cursor: "pointer" }}
                                >
                                    {meme.mark === Mark.LIKE ? (
                                        <Icon24ThumbsUp />
                                    ) : (
                                        <Icon24ThumbsUpOutline />
                                    )}
                                </div>
                            </div>

                            <div
                                onClick={() => addToList("favorite")}
                                className={
                                    meme.isFavorites
                                        ? styles.favoritesCheck
                                        : styles.favorites
                                }
                            >
                                {meme.favoritesCount}

                                <div className={styles.verticalDivider} />

                                {meme.isFavorites
                                    ? "В избранном"
                                    : "В избранное"}
                            </div>
                        </div>
                    </div>

                    <div>
                        <SimpleCell
                            disabled
                            subtitle={`Всего: ${meme.commentsCount}`}
                            before={<Icon24CommentOutline />}
                            after={
                                <Button
                                    mode="secondary"
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
            )}
        </Panel>
    )
}
