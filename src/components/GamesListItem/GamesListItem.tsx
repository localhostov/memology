import { GameModeItem } from "../../panels"
import styles from "./styles.module.css"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"

export const GamesListItem = ({ item }: { item: GameModeItem }) => {
    const navigator = useRouteNavigator()

    const openGame = () => {
        navigator.push(item.route)
    }

    return (
        <center>
            <div className={styles.container} onClick={openGame}>
                <img src={item.icon} alt={""} className={styles.icon} />
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>
            </div>
        </center>
    )
}
