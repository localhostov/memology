import { GameInfoEffects } from "@shared"
import { IModalProps, TGameModeType } from "@types"
import { Icon24GameOutline, Icon56CancelCircleOutline } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Avatar,
    Button,
    ButtonGroup,
    ModalCard,
    Placeholder,
    SimpleCell,
    Spinner,
} from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { useEffect } from "react"

export const GameInviteModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"mode" | "gameId">()
    const loading = useUnit(GameInfoEffects.getGameInviteDataFx.pending)
    const error = useUnit(GameInfoEffects.$gameInfoError)
    const ownerData = useUnit(GameInfoEffects.$gameInfo)

    const gameMode = {
        history: "история",
    }[(params?.mode || "history") as TGameModeType]

    useEffect(() => {
        if (params?.mode && params.gameId) {
            GameInfoEffects.fetchGameInfo({
                roomId: params.gameId,
                mode: params.mode as TGameModeType,
            })
        }
    }, [params?.gameId, params?.mode])

    const accept = () => {
        if (params?.mode && params.gameId) {
            navigator.push(`/games/${params.mode}/${params.gameId}`)
        }
    }

    return (
        <ModalCard id={id}>
            {loading ? (
                <Spinner size="large" style={{ padding: "40px 0" }} />
            ) : error ? (
                <Placeholder
                    header="Ой, ошибочка"
                    icon={
                        <Icon56CancelCircleOutline
                            style={{ width: 56, height: 56 }}
                        />
                    }
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                >
                    {error.message}
                </Placeholder>
            ) : (
                <>
                    <Placeholder
                        header="Приглашение в игру"
                        icon={
                            <Icon24GameOutline
                                style={{ width: 56, height: 56 }}
                            />
                        }
                        style={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                        Тебя приглашают в игру {gameMode}
                    </Placeholder>

                    <div style={{ height: 16 }} />

                    <div>
                        <SimpleCell
                            before={
                                <Avatar size={40} src={ownerData?.photo_200} />
                            }
                            subtitle="Создатель комнаты"
                            style={{ paddingLeft: 0 }}
                        >
                            {ownerData?.first_name} {ownerData?.last_name}
                        </SimpleCell>

                        <div style={{ height: 16 }} />

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
                </>
            )}
        </ModalCard>
    )
}
