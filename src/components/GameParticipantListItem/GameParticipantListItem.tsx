import { $vkUserData } from "@shared"
import { IGameParticipant } from "@types"
import { Icon24CancelOutline, Icon24CrownOutline } from "@vkontakte/icons"
import { Avatar, IconButton, SimpleCell } from "@vkontakte/vkui"
import { useUnit } from "effector-react/compat"
import { MouseEvent } from "react"
import styles from "./styles.module.css"

export const GameParticipantListItem = ({
    item,
}: {
    item: IGameParticipant
}) => {
    const currentVkUserData = useUnit($vkUserData)

    const openUser = () => {
        const vkUrl = `https://vk.com/id${item.vkData.id}`
        window.open(vkUrl, "_blank")
    }

    const kickUser = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        console.log(`user with id ${item.vkData.id} kicked`)
    }

    return (
        <SimpleCell
            before={<Avatar size={40} src={item.vkData.photo_200} />}
            className={styles.container}
            onClick={openUser}
            after={
                <div>
                    {item.isOwner ? (
                        <Icon24CrownOutline />
                    ) : currentVkUserData?.id === item.vkData.id ? (
                        <IconButton onClick={(e) => kickUser(e)}>
                            <Icon24CancelOutline />
                        </IconButton>
                    ) : null}
                </div>
            }
        >
            {item.vkData.first_name} {item.vkData.last_name}
        </SimpleCell>
    )
}
