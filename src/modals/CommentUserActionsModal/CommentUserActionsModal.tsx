import { deleteComment } from "@shared"
import { IModalProps } from "@types"
import { Icon24DeleteOutline } from "@vkontakte/icons"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { ModalCard, SimpleCell } from "@vkontakte/vkui"

export const CommentUserActionsModal = ({ id }: IModalProps) => {
    const navigator = useRouteNavigator()
    const params = useParams<"commentId">()
    const deleteCommentAction = () => {
        deleteComment(params!.commentId!)
        navigator.hideModal()
    }

    return (
        <ModalCard id={id}>
            <SimpleCell
                before={<Icon24DeleteOutline />}
                onClick={deleteCommentAction}
                subtitle="Удаление происходит без подтверждения"
            >
                Удалить комментарий
            </SimpleCell>
        </ModalCard>
    )
}
