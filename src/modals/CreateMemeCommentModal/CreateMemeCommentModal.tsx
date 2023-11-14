import { IModalProps } from "@types"
import { useParams } from "@vkontakte/vk-mini-apps-router"
import { ModalCard } from "@vkontakte/vkui"

export const CreateMemeCommentModal = ({ id }: IModalProps) => {
    const params = useParams<"memeId">()

    return <ModalCard id={id}>memeId: {params?.memeId}</ModalCard>
}
