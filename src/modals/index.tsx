import { Modals } from "@shared"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { ModalRoot } from "@vkontakte/vkui"
import { CommentUserActionsModal } from "./CommentUserActionsModal/CommentUserActionsModal"
import { CreateMemeCommentModal } from "./CreateMemeCommentModal/CreateMemeCommentModal"
import { ExitFromGameConfirmation } from "./ExitFromGameConfirmation/ExitFromGameConfirmation"
import { GameInfoPreviewModal } from "./GamePreviewModal/GameInfoPreviewModal"
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
            <GameInfoPreviewModal id={Modals.GAME_INFO_PREVIEW} />
            <ExitFromGameConfirmation id={Modals.EXIT_FROM_GAME_CONFIRMATION} />
        </ModalRoot>
    )
}
