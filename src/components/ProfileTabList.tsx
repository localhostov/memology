import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Search } from "@vkontakte/vkui"
import { useState } from "react"
import { MemeItem } from "../shared"
import styles from "../styles/profile.module.css"
import { TListType } from "../types"
import { MemeListItem } from "./MemeListItem"

interface Props {
    type: TListType
}

export function ProfileTabList({ type }: Props) {
    const navigator = useRouteNavigator()
    const searchPlaceholder: Record<TListType, string> = {
        like: "Искать в лайках",
        dislike: "Искать в дизлайках",
        favorite: "Искать в избранных",
    }
    const [search, setSearch] = useState("")
    const openModal = (memeId: number) => {
        navigator.push(`/me/profileMemeListActions/${type}/${memeId}`)
    }

    return (
        <>
            <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                after={null}
                placeholder={searchPlaceholder[type]}
            />
            <div className={styles.tabContentContainer}>
                <div className={styles.cardsContainer}>
                    {mockedLikesList.map((item) => (
                        <MemeListItem
                            key={item.id}
                            item={item}
                            onClick={openModal}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

const mockedLikesList: MemeItem[] = [
    {
        id: 0,
        title: "Не придумал",
        description:
            "Описание тоже не придумал ываваовоаоывао фыаофыоваф ыва фыв аыва",
        isFavorites: false,
        image: "https://get.wallhere.com/photo/1920x1080-px-car-JDM-Nissan-S15-Silvia-683876.jpg",
        likesCount: 0,
        favoritesCount: 0,
    },
    {
        id: 1,
        title: "Не придумаfл",
        description:
            "Описание тоже не придумал ываваовоаоывао фыаофыоваф ыва фыв аыва",
        isFavorites: true,
        image: "https://get.wallhere.com/photo/1920x1080-px-car-JDM-Nissan-S15-Silvia-683876.jpg",
        likesCount: 10,
        favoritesCount: 10,
    },
]
