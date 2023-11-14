import { IModalProps } from "@types"
import { ModalCard } from "@vkontakte/vkui"
import { useParams } from "@vkontakte/vk-mini-apps-router"

export const CreateMemeCommentModal = ({ id }: IModalProps) => {
    const params = useParams<"memeId">()

    return <ModalCard id={id}>memeId: {params?.memeId}</ModalCard>
}
