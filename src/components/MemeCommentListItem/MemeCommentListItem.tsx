import { $vkUserData, Mark, readableDate } from "@shared"
import { TCommentWithOwner, TMemeMarkType } from "@types"
import {
    Icon24MoreHorizontal,
    Icon24ThumbsDown,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUp,
    Icon24ThumbsUpOutline,
} from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Avatar, IconButton, SimpleCell } from "@vkontakte/vkui"
import { useUnit } from "effector-react/compat"
import { MouseEvent } from "react"
import styles from "./styles.module.css"

export const MemeCommentListItem = ({ item }: { item: TCommentWithOwner }) => {
    const vkUserData = useUnit($vkUserData)
    const navigator = useRouteNavigator()
    const params = useParams<"memeId">()

    const handleUserClick = () => {
        window.open(`https://vk.com/id${item.vkId}`, "_blank")
    }

    const afterIcon = {
        [Mark.LIKE]: <Icon24ThumbsUp />,
        [Mark.DISLIKE]: <Icon24ThumbsDown />,
    }

    const handleMark = (mark: TMemeMarkType) => {
        console.log(`user change mark to ${mark}`)
    }

    const openUserActions = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        navigator.push(`/meme/${params?.memeId}/comment/${item.id}/actions`)
    }

    return (
        <div>
            <SimpleCell
                before={<Avatar size={40} src={item.owner.photo_200} />}
                after={
                    <div className={styles.userActions}>
                        {item.mark !== undefined && afterIcon[item.mark]}
                        {item.owner.id === vkUserData?.id && (
                            <IconButton onClick={openUserActions}>
                                <Icon24MoreHorizontal />
                            </IconButton>
                        )}
                    </div>
                }
                subtitle={readableDate(item.createdAt * 1000)}
                onClick={handleUserClick}
            >
                {item.owner.first_name} {item.owner.last_name}
            </SimpleCell>

            <div className={styles.contentContainer}>
                <div className={styles.textContainer}>
                    <div>
                        <div className={styles.textLine} />
                    </div>

                    <div className={styles.text}>{item.text}</div>
                </div>

                <div className={styles.markContainer}>
                    <div
                        onClick={() => handleMark("dislike")}
                        style={{ padding: 0, cursor: "pointer" }}
                    >
                        {item.mark === Mark.DISLIKE ? (
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
                        {item.mark === Mark.LIKE ? (
                            <Icon24ThumbsUp />
                        ) : (
                            <Icon24ThumbsUpOutline />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
