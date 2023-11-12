import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Placeholder, Search, Spinner } from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { useEffect } from "react"
import { ProfileEffects } from "../shared"
import styles from "../styles/profile.module.css"
import { TProfileTabListType } from "../types"
import { MemeListItem } from "./MemeListItem"
import { Icon28SadFaceOutline } from "@vkontakte/icons"

interface Props {
    type: TProfileTabListType
}

const searchPlaceholder: Record<TProfileTabListType, string> = {
    like: "Искать в лайках",
    dislike: "Искать в дизлайках",
    favorite: "Искать в избранных",
}

const listName: Record<TProfileTabListType, string> = {
    like: "лайков",
    dislike: "дизлайков",
    favorite: "избранных",
}

export function ProfileTabList({ type }: Props) {
    const navigator = useRouteNavigator()
    const memes = useUnit(ProfileEffects.$memesList)
    const search = useUnit(ProfileEffects.$memesSearch)
    const memesIsLoading = useUnit(ProfileEffects.getMemesListFx.pending)

    useEffect(() => {
        ProfileEffects.fetchMemes()
    }, [])

    const openModal = (memeId: number) => {
        navigator.push(`/me/profileMemeListActions/${type}/${memeId}`)
    }

    const memesList = useList(ProfileEffects.$memesList, (item) => (
        <MemeListItem key={item.id} item={item} onClick={openModal} />
    ))

    return (
        <>
            <Search
                value={search}
                onChange={(e) => ProfileEffects.searchMeme(e.target.value)}
                after={null}
                placeholder={searchPlaceholder[type]}
            />
            <div className={styles.tabContentContainer}>
                {memesIsLoading ? (
                    <Spinner size="medium" />
                ) : memes.length > 0 ? (
                    <div className={styles.cardsContainer}>{memesList}</div>
                ) : (
                    <Placeholder
                        icon={
                            <Icon28SadFaceOutline
                                style={{ width: 86, height: 86 }}
                            />
                        }
                        header="Ничего не найдено"
                    >
                        Похоже, вы еще не добавили такого мема в список{" "}
                        {listName[type]}
                    </Placeholder>
                )}
            </div>
        </>
    )
}
