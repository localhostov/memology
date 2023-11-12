import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { ModalRoot } from "@vkontakte/vkui"
import { Modals } from "../shared"
import { ProfileMemeListActionsModal } from "./ProfileMemeListActionsModal"

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
        </ModalRoot>
    )
}
