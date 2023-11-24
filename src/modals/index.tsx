import { Modals } from "@shared"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { ModalRoot } from "@vkontakte/vkui"
import { CommentUserActionsModal } from "./CommentUserActionsModal/CommentUserActionsModal"
import { CreateMemeCommentModal } from "./CreateMemeCommentModal/CreateMemeCommentModal"
import { ExitFromGameConfirmation } from "./ExitFromGameConfirmation/ExitFromGameConfirmation"
import { GameInviteModal } from "./GameInviteModal/GameInviteModal"
import { GameInfoPreviewModal } from "./GamePreviewModal/GameInfoPreviewModal"
import { HistoryGifPreviewModal } from "./HistoryGifPreviewModal/HistoryGifPreviewModal"
import { ProfileMemeListActionsModal } from "./ProfileMemeListActionsModal/ProfileMemeListActionsModal"
import { ShareGameModal } from "./ShareGameModal/ShareGameModal"

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
            <GameInviteModal id={Modals.GAME_INVITE} />
            <HistoryGifPreviewModal id={Modals.HISTORY_GIF_PREVIEW} />
            <ShareGameModal id={Modals.SHARE_GAME_MODAL} />
        </ModalRoot>
    )
}
