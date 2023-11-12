import { Button, ButtonGroup, ModalCard } from "@vkontakte/vkui"
import { IModalProps } from "../types"
import { Icon24CancelCircleFillRed } from "@vkontakte/icons"
import {
    useRouteNavigator,
    useSearchParams,
} from "@vkontakte/vk-mini-apps-router"

export const ProfileMemeListActionsModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const [params] = useSearchParams()

    const dropFromList = () => {
        const list = params.get("list")
        const memeId = params.get("memeId")

        console.log(`user drop meme (${memeId}) from list ${list}`)
    }

    return (
        <ModalCard
            id={id}
            icon={
                <Icon24CancelCircleFillRed style={{ width: 48, height: 48 }} />
            }
            header={"Удалить мем из списка"}
            subheader={"Вы уверены, что хотите удалить этот мем из списка?"}
            actions={
                <ButtonGroup stretched>
                    <Button
                        stretched
                        mode={"secondary"}
                        size={"m"}
                        onClick={() => navigator.hideModal()}
                    >
                        Отмена
                    </Button>
                    <Button stretched size={"m"} onClick={dropFromList}>
                        Удалить
                    </Button>
                </ButtonGroup>
            }
        ></ModalCard>
    )
}
