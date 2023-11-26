import { downloadFile, GamesEffects } from "@shared"
import { IModalProps } from "@types"
import bridge from "@vkontakte/vk-bridge"
import { Button, ModalCard, Platform, usePlatform } from "@vkontakte/vkui"
import { useUnit } from "effector-react"

export const HistoryGifPreviewModal = ({ id }: IModalProps) => {
    const gifs = useUnit(GamesEffects.History.$gifContent)
    const root = useUnit(GamesEffects.History.$currentChatRoot)
    const platform = usePlatform()
    const gifContent = gifs.find((x) => x.dialogId === root)

    if (!gifContent) return <div>Гифки то нет</div>

    const downloadGif = () => {
        try {
            console.log(gifContent.base64)
            if (platform === Platform.VKCOM) {
                downloadFile(gifContent.link, "history.gif")
            } else {
                bridge
                    .send("VKWebAppDownloadFile", {
                        url: gifContent.base64,
                        filename: "history.gif",
                    })
                    .then(console.log)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ModalCard id={id}>
            <img src={gifContent.link} alt="" style={{ borderRadius: 14 }} />

            <div style={{ height: 16 }} />

            <Button stretched size="l" onClick={downloadGif}>
                Скачать GIF
            </Button>
        </ModalCard>
    )
}
