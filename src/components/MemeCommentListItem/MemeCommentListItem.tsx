import { $meme, $vkUserData, Mark, readableDate } from "@shared"
import { TCommentWithOwner } from "@types"
import {
    Icon24MoreHorizontal,
    Icon24ThumbsDown,
    Icon24ThumbsUp,
} from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Avatar, IconButton, SimpleCell } from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { MouseEvent } from "react"
import styles from "./styles.module.css"

export const MemeCommentListItem = ({ item }: { item: TCommentWithOwner }) => {
    const vkUserData = useUnit($vkUserData)
    const navigator = useRouteNavigator()
    const params = useParams<"memeId">()
    const meme = useUnit($meme)

    const handleUserClick = () => {
        window.open(`https://vk.com/id${item.vkId}`, "_blank")
    }

    const afterIcon = {
        [Mark.LIKE]: (
            <Icon24ThumbsUp style={{ color: "var(--like-background)" }} />
        ),
        [Mark.DISLIKE]: (
            <Icon24ThumbsDown
                style={{
                    color: "var(--dislike-background)",
                }}
            />
        ),
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
                        {vkUserData?.id === item.owner.id
                            ? meme?.mark !== undefined && afterIcon[meme.mark]
                            : item.mark !== undefined && afterIcon[item.mark]}

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
            </div>
        </div>
    )
}
