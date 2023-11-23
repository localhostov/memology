import { disconnectWs } from "@shared"
import { IModalProps } from "@types"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, ButtonGroup, ModalCard } from "@vkontakte/vkui"

export const ExitFromGameConfirmation = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()

    return (
        <ModalCard
            id={id}
            header="Вы уверены, что хотите выйти?"
            subheader="После выхода комната будет удалена или передана другому участнику, если вы были не один в комнате"
            actions={
                <ButtonGroup gap="s" mode="horizontal" stretched>
                    <Button
                        onClick={() => navigator.hideModal()}
                        stretched
                        size="l"
                        mode="secondary"
                    >
                        Не выходить
                    </Button>

                    <Button
                        onClick={() => disconnectWs()}
                        stretched
                        size="l"
                        appearance="negative"
                    >
                        Выйти
                    </Button>
                </ButtonGroup>
            }
        />
    )
}
