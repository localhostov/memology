import { RatingItem } from "../panels"
import styles from "../styles/ratingListItem.component.module.css"
import { Tappable } from "@vkontakte/vkui"

export const RatingListItem = ({ item }: { item: RatingItem }) => {
    // const openMeme = () => {}

    return (
        <Tappable className={styles.card}>
            <img
                src={item.image}
                style={{ background: `url(${item.image})` }}
                className={styles.memeImage}
                alt=""
            />

            <div></div>
        </Tappable>
    )
}
