import { $vkUserData } from "@shared"
import { IModalProps, TGameModeType } from "@types"
import { Icon24GameOutline } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Avatar,
    Button,
    ButtonGroup,
    ModalCard,
    SimpleCell,
} from "@vkontakte/vkui"
import { useUnit } from "effector-react/compat"

export const GameInviteModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"mode" | "gameId">()
    const vkData = useUnit($vkUserData) // TODO: drop this line

    const gameMode = {
        history: "история",
    }[(params?.mode || "history") as TGameModeType]

    const accept = () => {
        // TODO: game validation code

        navigator.push(`/games/${params?.mode}/${params?.gameId}`)
    }

    return (
        <ModalCard
            id={id}
            header="Приглашение в игру"
            subheader={`Тебя приглашают в игру ${gameMode}`}
            icon={<Icon24GameOutline style={{ width: 56, height: 56 }} />}
            actions={
                <div
                    style={{
                        flex: 1,
                        gap: 16,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <SimpleCell
                        before={<Avatar size={40} src={vkData?.photo_200} />}
                        subtitle="Создатель комнаты"
                        style={{ paddingLeft: 0 }}
                    >
                        Александр Локалхостов
                    </SimpleCell>
                    <ButtonGroup gap="s" mode="horizontal" stretched>
                        <Button
                            onClick={() => navigator.hideModal()}
                            stretched
                            size="l"
                            appearance="negative"
                        >
                            Отклонить
                        </Button>

                        <Button onClick={accept} stretched size="l">
                            Принять
                        </Button>
                    </ButtonGroup>
                </div>
            }
        />
    )
}
