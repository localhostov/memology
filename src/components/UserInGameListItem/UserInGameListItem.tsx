import { UserInfo } from "@vkontakte/vk-bridge"
import { Avatar, SimpleCell } from "@vkontakte/vkui"
import styles from "./styles.module.css"

export const UserInGameListItem = ({ item }: { item: UserInfo }) => {
    return (
        <SimpleCell
            before={<Avatar size={40} src={item.photo_200} />}
            className={styles.container}
        >
            {item.first_name} {item.last_name}
        </SimpleCell>
    )
}
