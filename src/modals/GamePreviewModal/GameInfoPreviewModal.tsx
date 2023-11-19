import { setSnackbar } from "@shared"
import { IModalProps, TGameModeType } from "@types"
import { Icon24CancelOutline } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, ModalPage, Snackbar, Title } from "@vkontakte/vkui"
import { useState } from "react"
import { API } from "../../shared/api"
import styles from "./styles.module.css"

export const GameInfoPreviewModal = ({ id }: IModalProps) => {
    const params = useParams<"mode">()
    const navigator = useRouteNavigator()
    const currentGame = gameMode[(params?.mode || "history") as TGameModeType]
    const [loading, setLoading] = useState(false)

    const createLobby = async () => {
        setLoading(true)

        API.createRoom((params?.mode || "history") as TGameModeType)
            .then((roomId) => {
                navigator.push(`${currentGame.route}/${roomId}`)
            })
            .catch(() => {
                setSnackbar(
                    <Snackbar
                        onClose={() => setSnackbar(null)}
                        before={
                            <Icon24CancelOutline fill="var(--vkui--color_icon_positive)" />
                        }
                    >
                        Произошла какая-то ошибка при создании лобби
                    </Snackbar>,
                )
            })
            .finally(() => setLoading(false))
    }

    return (
        <ModalPage id={id}>
            <div className={styles.container}>
                <Title level="3">{currentGame.title}</Title>
                <div className={styles.description}>
                    {currentGame.description}
                </div>

                <div style={{ height: 16 }} />

                <Button
                    stretched
                    size="l"
                    onClick={createLobby}
                    loading={loading}
                >
                    Создать лобби
                </Button>
            </div>
        </ModalPage>
    )
}

const gameMode: Record<TGameModeType, IGameInfo> = {
    history: {
        title: "Об истории",
        description:
            "Какое-то описание даааааааа, возможно оно будет очень длинным, потому что здесь надо будет рассказать об выбранной игре и так далее бла бла бла",
        route: "/games/history",
    },
}

interface IGameInfo {
    title: string
    description: string
    route: string
}
