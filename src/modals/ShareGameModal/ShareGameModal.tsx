import { APP_ID, setSnackbar } from "@shared"
import { IModalProps } from "@types"
import { Icon16CopyOutline } from "@vkontakte/icons"
import bridge from "@vkontakte/vk-bridge"
import { useParams } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    ContentCard,
    IconButton,
    Input,
    ModalCard,
    Snackbar,
    Text,
} from "@vkontakte/vkui"

export const ShareGameModal = ({ id }: IModalProps) => {
    const params = useParams<"roomId" | "mode">()
    const inviteLink = `https://vk.com/app${APP_ID}#/games/${params?.mode}/invite/${params?.roomId}`

    const shareVk = () => {
        bridge.send("VKWebAppShare", { link: inviteLink })
    }

    const copyInviteLink = () => {
        bridge.send("VKWebAppCopyText", { text: inviteLink }).then(() => {
            setSnackbar(
                <Snackbar onClose={() => setSnackbar(null)}>
                    Ссылка-приглашение скопирована
                </Snackbar>,
            )
        })
    }

    return (
        <ModalCard id={id}>
            <Text weight="1" style={{ fontSize: 20 }}>
                Пригласить
            </Text>

            <div style={{ height: 16 }} />

            <Input
                value={inviteLink}
                after={
                    <IconButton onClick={copyInviteLink}>
                        <Icon16CopyOutline />
                    </IconButton>
                }
            />

            <div style={{ height: 16 }} />

            <ContentCard
                header="Как это работает"
                caption="Вы можете скопировать ссылку на игру и пригласить своих друзей из других ресурсов в эту игру или просто нажать на кнопку ниже, чтобы поделиться ссылкой с друзьями внутри VK. Чем больше участников будет - тем веселее"
            />

            <div style={{ height: 16 }} />

            <Button size="l" stretched onClick={shareVk}>
                Поделиться в VK
            </Button>
        </ModalCard>
    )
}
