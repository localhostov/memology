import { readableDate } from "@shared"
import { TMemeMarkType } from "@types"
import {
    Icon24ThumbsDown,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUp,
    Icon24ThumbsUpOutline,
} from "@vkontakte/icons"
import { UserInfo } from "@vkontakte/vk-bridge"
import { Avatar, SimpleCell } from "@vkontakte/vkui"
import { CommentItem } from "../../panels"
import styles from "./styles.module.css"

export const MemeCommentListItem = ({
    item,
    userData,
}: {
    item: CommentItem
    userData: UserInfo | null
}) => {
    const handleUserClick = () => {
        window.open(`https://vk.com/id${item.senderId}`, "_blank")
    }

    const afterIcon = {
        like: <Icon24ThumbsUp />,
        dislike: <Icon24ThumbsDown />,
    }

    const handleMark = (mark: TMemeMarkType) => {
        console.log(`user change mark to ${mark}`)
    }

    return (
        <div>
            <SimpleCell
                before={<Avatar size={40} src={userData?.photo_200} />}
                after={
                    item.userMemeMark !== null && afterIcon[item.userMemeMark]
                }
                subtitle={readableDate(item.timestamp)}
                onClick={handleUserClick}
            >
                {userData?.first_name} {userData?.last_name}
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
                        {item.myMark === "dislike" ? (
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
                        {item.myMark === "like" ? (
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
