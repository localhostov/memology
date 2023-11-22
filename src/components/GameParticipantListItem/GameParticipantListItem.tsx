import { $vkUserData } from "@shared"
import { IGameParticipant, TSendFunction } from "@types"
import { Icon24CancelOutline, Icon24CrownOutline } from "@vkontakte/icons"
import { Avatar, IconButton, SimpleCell } from "@vkontakte/vkui"
import { useUnit } from "effector-react/compat"
import { MouseEvent } from "react"
import styles from "./styles.module.css"

export const GameParticipantListItem = ({
    item,
    send,
    ownerId,
}: {
    item: IGameParticipant
    send: TSendFunction<"history">
    ownerId: number | undefined
}) => {
    const currentVkUser = useUnit($vkUserData)

    const openUser = () => {
        const vkUrl = `https://vk.com/id${item.vkData.id}`
        window.open(vkUrl, "_blank")
    }

    const kickUser = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()

        send("kickUser", {
            vkId: item.vkId,
        })
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
                    ) : ownerId === currentVkUser?.id ? (
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
