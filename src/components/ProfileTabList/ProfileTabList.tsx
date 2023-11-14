import { ProfileEffects } from "@shared"
import { TProfileTabListType } from "@types"
import { Icon24FolderOutline, Icon28SadFaceOutline } from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Placeholder, Search, Spinner } from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { useEffect } from "react"
import styles from "../../panels/Profile/profile.module.css"
import { MemeListItem } from "../index"

interface Props {
    type: TProfileTabListType
}

const searchPlaceholder: Record<TProfileTabListType, string> = {
    like: "Искать в лайках",
    dislike: "Искать в дизлайках",
    favorite: "Искать в избранных",
    my: "Искать в моих мемах",
}

const listName: Omit<Record<TProfileTabListType, string>, "my"> = {
    like: "лайков",
    dislike: "дизлайков",
    favorite: "избранных",
}

export function ProfileTabList({ type }: Props) {
    const navigator = useRouteNavigator()
    const memes = useUnit(ProfileEffects.$memesList)
    const search = useUnit(ProfileEffects.$memesSearch)
    const memesIsLoading = useUnit(ProfileEffects.getMemesListFx.pending)
    const memesListSearchIsEmpty =
        search.trim().length > 0 && memes.length === 0

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
                            type === "my" ? (
                                <Icon24FolderOutline
                                    style={{ width: 86, height: 86 }}
                                />
                            ) : (
                                <Icon28SadFaceOutline
                                    style={{ width: 86, height: 86 }}
                                />
                            )
                        }
                        header={
                            memesListSearchIsEmpty
                                ? "Ничего не найдено"
                                : "Список пуст"
                        }
                    >
                        {type === "my"
                            ? memesListSearchIsEmpty
                                ? `Мемы с таким описанием или названием не найдены в этом списке`
                                : `Похоже, вы еще не предложили нам ни одного мема`
                            : memesListSearchIsEmpty
                            ? `Похоже, вы еще не добавили такого мема в список ${listName[type]}`
                            : `Вы не добавили ни одного мема в список ${listName[type]}`}
                    </Placeholder>
                )}
            </div>
        </>
    )
}
