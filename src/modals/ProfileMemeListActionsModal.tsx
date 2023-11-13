import { IModalProps } from "@types"
import { Icon24MoreHorizontal } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, ButtonGroup, ModalCard } from "@vkontakte/vkui"

export const ProfileMemeListActionsModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"list" | "memeId">()
    console.log(params)
    const dropFromList = () => {
        console.log(
            `user drop meme (${params?.memeId}) from list ${params?.list}`,
        )
    }

    const openMeme = () => {
        navigator.push(`/meme/${params?.memeId}`)
    }

    return (
        <ModalCard
            id={id}
            icon={<Icon24MoreHorizontal style={{ width: 48, height: 48 }} />}
            header="Действия"
            subheader="Выберите, что бы вы хотели сделать с этим мемом"
            actions={
                <ButtonGroup stretched mode="vertical">
                    <Button
                        stretched
                        size="m"
                        appearance="negative"
                        onClick={dropFromList}
                    >
                        Удалить
                    </Button>

                    <Button stretched size="m" onClick={openMeme}>
                        Открыть
                    </Button>

                    <Button
                        stretched
                        mode="secondary"
                        size="m"
                        onClick={() => navigator.hideModal()}
                    >
                        Отмена
                    </Button>
                </ButtonGroup>
            }
        />
    )
}
