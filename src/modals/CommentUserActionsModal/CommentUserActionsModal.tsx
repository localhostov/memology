import { IModalProps } from "@types"
import { Icon24DeleteOutline } from "@vkontakte/icons"
import { useParams } from "@vkontakte/vk-mini-apps-router"
import { ModalCard, SimpleCell } from "@vkontakte/vkui"

export const CommentUserActionsModal = ({ id }: IModalProps) => {
    const params = useParams<"commentId">()
    const deleteComment = () => {
        console.log(`user delete comment with ID ${params?.commentId}`)
    }

    return (
        <ModalCard id={id}>
            <SimpleCell
                before={<Icon24DeleteOutline />}
                onClick={deleteComment}
                subtitle="Удаление происходит без подтверждения"
            >
                Удалить комментарий
            </SimpleCell>
        </ModalCard>
    )
}
