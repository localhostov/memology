import { downloadFile, GamesEffects } from "@shared"
import { IModalProps } from "@types"
import bridge from "@vkontakte/vk-bridge"
import { Button, ModalCard, Platform, usePlatform } from "@vkontakte/vkui"
import { useUnit } from "effector-react"

export const HistoryGifPreviewModal = ({ id }: IModalProps) => {
    const gifContent = useUnit(GamesEffects.History.$gifContent)!
    const platform = usePlatform()

    const downloadGif = () => {
        try {
            if (platform === Platform.VKCOM) {
                downloadFile(gifContent, "history.gif")
            } else {
                bridge.send("VKWebAppDownloadFile", {
                    url: gifContent.split("blob:")[1],
                    filename: "history.gif",
                })
            }
        } catch (error) {}
    }

    return (
        <ModalCard id={id}>
            <img src={gifContent} alt="" style={{ borderRadius: 14 }} />

            <div style={{ height: 16 }} />

            <Button stretched size="l" onClick={downloadGif}>
                Скачать GIF
            </Button>
        </ModalCard>
    )
}
