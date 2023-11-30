import { MemeCommentListItem } from "@components"
import {
    $comments,
    $meme,
    $memeError,
    addToList,
    fetchMeme,
    getCommentsFx,
    getMemeFx,
    Mark,
    Modals,
    panelNames,
    unmountMeme,
    useSafeBack,
} from "@shared"
import { IPanelProps } from "@types"
import {
    Icon16LinkOutline,
    Icon24CommentOutline,
    Icon24ThumbsDown,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUp,
    Icon24ThumbsUpOutline,
    Icon56CancelCircleOutline,
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
    Placeholder,
    SimpleCell,
    Spinner,
} from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { useEffect } from "react"
import styles from "./styles.module.css"

export const Meme = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const meme = useUnit($meme)
    const ownerVkUrl = `https://vk.com/id${meme?.owner.id}`
    const { memeId } = useParams<"memeId">()!
    const commentsIsLoading = useUnit(getCommentsFx.pending)
    const commentsItemsList = useUnit($comments)
    const memeError = useUnit($memeError)
    const loadingMeme = useUnit(getMemeFx.pending)
    const safeBack = useSafeBack()

    useEffect(() => {
        fetchMeme(Number(memeId!))

        return () => {
            unmountMeme()
        }
    }, [memeId])

    const openImage = () => {
        if (!meme) return
        bridge.send("VKWebAppShowImages", {
            images: [meme.image],
        })
    }

    const openCommentModal = () => {
        navigator.showModal(Modals.CREATE_MEME_COMMENT)
    }

    const commentsList = useList($comments, (item) => (
        <div key={item.id}>
            <MemeCommentListItem item={item} />
        </div>
    ))

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => safeBack.back()} />}
            >
                {panelNames[id]}
            </PanelHeader>

            <Group>
                {loadingMeme && !meme ? (
                    <Placeholder
                        icon={<Spinner size="large" />}
                        header="Загрузочка..."
                    />
                ) : memeError ? (
                    <Placeholder
                        header="Ой, ошибочка"
                        icon={
                            <Icon56CancelCircleOutline
                                style={{ width: 56, height: 56 }}
                            />
                        }
                    >
                        {memeError.message}
                    </Placeholder>
                ) : (
                    meme && (
                        <>
                            <div style={{ height: 16 }} />

                            <div className={styles.imageContainer}>
                                <img
                                    src={meme.image}
                                    className={styles.image}
                                    onClick={openImage}
                                    alt=""
                                />

                                <div className={styles.imageContainerContent}>
                                    {meme.placeInWeeklyRating && (
                                        <div className={styles.placeInRating}>
                                            #{meme.placeInWeeklyRating} в
                                            недельном рейтинге
                                        </div>
                                    )}
                                    {meme.placeInEternalRating && (
                                        <div className={styles.placeInRating}>
                                            #{meme.placeInEternalRating} в
                                            постоянном рейтинге
                                        </div>
                                    )}
                                    <div className={styles.title}>
                                        {meme.title}
                                    </div>
                                    <div className={styles.description}>
                                        {meme.description}
                                    </div>
                                </div>
                            </div>

                            {/*<div style={{ padding: 16 }}>*/}
                            {/*    */}
                            {/*</div>*/}

                            <div className={styles.mainContent}>
                                <SimpleCell
                                    hasHover={false}
                                    hasActive={false}
                                    before={
                                        <Avatar
                                            size={36}
                                            src={meme.owner.photo_200}
                                        />
                                    }
                                    style={{
                                        cursor: "pointer",
                                        padding: 0,
                                    }}
                                    after={<Icon16LinkOutline />}
                                    subtitle="Автор мема"
                                    onClick={() =>
                                        window.open(ownerVkUrl, "_blank")
                                    }
                                >
                                    {meme.owner.first_name || "Загрузка..."}
                                    {" " + meme.owner.last_name}
                                </SimpleCell>

                                <div style={{ height: 16 }} />

                                <div className={styles.actionsContainer}>
                                    <div>
                                        <div
                                            onClick={() =>
                                                addToList(Mark.DISLIKE)
                                            }
                                            style={{
                                                padding: 0,
                                                cursor: "pointer",
                                            }}
                                        >
                                            {meme.mark === Mark.DISLIKE ? (
                                                <Icon24ThumbsDown
                                                    style={{
                                                        color: "var(--dislike-background)",
                                                    }}
                                                />
                                            ) : (
                                                <Icon24ThumbsDownOutline />
                                            )}
                                        </div>
                                        {meme.likesCount}
                                        <div
                                            onClick={() => addToList(Mark.LIKE)}
                                            style={{
                                                padding: 0,
                                                cursor: "pointer",
                                            }}
                                        >
                                            {meme.mark === Mark.LIKE ? (
                                                <Icon24ThumbsUp
                                                    style={{
                                                        color: "var(--like-background)",
                                                    }}
                                                />
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

                                        <div
                                            className={styles.verticalDivider}
                                        />

                                        {meme.isFavorites
                                            ? "В избранном"
                                            : "В избранное"}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <SimpleCell
                                    disabled
                                    subtitle={
                                        meme.commentsCount > 0
                                            ? `Всего: ${meme.commentsCount}`
                                            : "Комментариев нет"
                                    }
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

                                {commentsIsLoading &&
                                commentsItemsList.length === 0 ? (
                                    <Placeholder
                                        icon={<Spinner size="medium" />}
                                        header="Загрузочка..."
                                    />
                                ) : commentsItemsList.length === 0 ? (
                                    <Placeholder
                                        icon={
                                            <Icon24CommentOutline
                                                style={{
                                                    width: 56,
                                                    height: 56,
                                                }}
                                            />
                                        }
                                        header="Комментариев нет"
                                        children="Но вы можете оставить первый комментарий"
                                    />
                                ) : (
                                    <div
                                        className={styles.commentListContainer}
                                    >
                                        {commentsList}
                                    </div>
                                )}
                            </div>
                        </>
                    )
                )}
            </Group>
        </Panel>
    )
}
