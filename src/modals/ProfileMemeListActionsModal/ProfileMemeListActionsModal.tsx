import { setSnackbar } from "@shared"
import { IModalProps } from "@types"
import { Icon24MoreHorizontal } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, ButtonGroup, ModalCard, Snackbar } from "@vkontakte/vkui"

export const ProfileMemeListActionsModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"list" | "memeId">()

    const dropFromList = () => {
        // const currentList = params?.list as Mark | "favorite"
        // addToList(currentList)

        setSnackbar(
            <Snackbar onClose={() => setSnackbar(null)}>
                Фича на доработке, просим понять и простить
            </Snackbar>,
        )

        // console.log(currentList)
    }

    const openMeme = () => {
        navigator.replace(`/meme/${params?.memeId}`)
    }

    return (
        <ModalCard
            id={id}
            icon={<Icon24MoreHorizontal style={{ width: 48, height: 48 }} />}
            header="Действия"
            subheader="Выберите, что бы вы хотели сделать с этим мемом в этом списке"
            actions={
                <ButtonGroup stretched mode="vertical" gap="s">
                    <ButtonGroup stretched mode="horizontal" gap="s">
                        <Button
                            stretched
                            size="l"
                            appearance="negative"
                            onClick={dropFromList}
                        >
                            Удалить
                        </Button>

                        <Button stretched size="l" onClick={openMeme}>
                            Открыть
                        </Button>
                    </ButtonGroup>

                    <Button
                        stretched
                        mode="secondary"
                        size="l"
                        onClick={() => navigator.hideModal()}
                    >
                        Отмена
                    </Button>
                </ButtonGroup>
            }
        />
    )
}
