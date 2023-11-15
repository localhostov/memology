import { Mark, readableDate } from "@shared"
import { TCommentWithOwner, TMemeMarkType } from "@types"
import {
    Icon24ThumbsDown,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUp,
    Icon24ThumbsUpOutline,
} from "@vkontakte/icons"
import { Avatar, SimpleCell } from "@vkontakte/vkui"
import styles from "./styles.module.css"

export const MemeCommentListItem = ({ item }: { item: TCommentWithOwner }) => {
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

    return (
        <div>
            <SimpleCell
                before={<Avatar size={40} src={item.owner.photo_200} />}
                after={item.mark !== undefined && afterIcon[item.mark]}
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
