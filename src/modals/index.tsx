import { Modals } from "@shared"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { ModalRoot } from "@vkontakte/vkui"
import { CommentUserActionsModal } from "./CommentUserActionsModal/CommentUserActionsModal"
import { CreateMemeCommentModal } from "./CreateMemeCommentModal/CreateMemeCommentModal"
import { ProfileMemeListActionsModal } from "./ProfileMemeListActionsModal/ProfileMemeListActionsModal"

export const Modal = ({ activeModal }: { activeModal: string | undefined }) => {
    const navigator = useRouteNavigator()

    const hideModal = () => {
        navigator.hideModal()
    }

    return (
        <ModalRoot activeModal={activeModal} onClose={hideModal}>
            <ProfileMemeListActionsModal
                id={Modals.PROFILE_MEME_LIST_ACTIONS}
            />
            <CreateMemeCommentModal id={Modals.CREATE_MEME_COMMENT} />
            <CommentUserActionsModal id={Modals.COMMENT_USER_ACTIONS} />
        </ModalRoot>
    )
}
