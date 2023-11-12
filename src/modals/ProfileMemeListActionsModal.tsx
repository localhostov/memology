import { Icon24CancelCircleFillRed } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, ButtonGroup, ModalCard } from "@vkontakte/vkui"
import { IModalProps } from "../types"

export const ProfileMemeListActionsModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"list" | "memeId">()
    console.log(params)
    const dropFromList = () => {
        console.log(
            `user drop meme (${params?.memeId}) from list ${params?.list}`,
        )
    }

    return (
        <ModalCard
            id={id}
            icon={
                <Icon24CancelCircleFillRed style={{ width: 48, height: 48 }} />
            }
            header="Удалить мем из списка"
            subheader="Вы уверены, что хотите удалить этот мем из списка?"
            actions={
                <ButtonGroup stretched>
                    <Button
                        stretched
                        mode="secondary"
                        size="m"
                        onClick={() => navigator.hideModal()}
                    >
                        Отмена
                    </Button>
                    <Button stretched size="m" onClick={dropFromList}>
                        Удалить
                    </Button>
                </ButtonGroup>
            }
        />
    )
}
