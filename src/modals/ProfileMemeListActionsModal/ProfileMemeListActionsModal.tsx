import { ProfileEffects, setSnackbar } from "@shared"
import { IModalProps } from "@types"
import { Icon24MoreHorizontal } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, ButtonGroup, ModalCard, Snackbar } from "@vkontakte/vkui"
import { useUnit } from "effector-react/compat"

export const ProfileMemeListActionsModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"list" | "memeId">()
    const memes = useUnit(ProfileEffects.$memesList)
    const currentMeme = memes?.find((it) => it.id === Number(params?.memeId))
    const deleteMemeIsLoading = useUnit(ProfileEffects.deleteMemeFx.pending)

    const deleteAction = () => {
        ProfileEffects.deleteMeme(Number(params?.memeId))
        setSnackbar(
            <Snackbar onClose={() => setSnackbar(null)}>
                {currentMeme?.isSuggest
                    ? "Предложенный мем удалён"
                    : "Мем удалён из приложения"}
            </Snackbar>,
        )

        navigator.hideModal()
    }

    const edit = () => {
        setSnackbar(
            <Snackbar onClose={() => setSnackbar(null)}>
                Этот мем пока нельзя редактировать
            </Snackbar>,
        )
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
                            onClick={deleteAction}
                            loading={deleteMemeIsLoading}
                        >
                            Удалить
                        </Button>

                        <Button stretched size="l" onClick={edit}>
                            Редактировать
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
