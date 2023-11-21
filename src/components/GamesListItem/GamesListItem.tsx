import { IGameModeItem } from "@types"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import styles from "./styles.module.css"

export const GamesListItem = ({ item }: { item: IGameModeItem }) => {
    const navigator = useRouteNavigator()

    const openGame = () => {
        navigator.push(`/games/preview/${item.mode}`)
    }

    return (
        <div className={styles.container} onClick={openGame}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.description}>{item.description}</div>
        </div>
    )
}
