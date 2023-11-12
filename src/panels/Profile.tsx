import {
    Avatar,
    Group,
    HorizontalScroll,
    Panel,
    PanelHeader,
    Search,
    Tabs,
    TabsItem,
    Title,
} from "@vkontakte/vkui"
import { $user, $vkUserData, Modals, panelNames } from "../shared"
import { IPanelProps } from "../types"
import styles from "../styles/profile.module.css"
import {
    Icon24BookmarkOutline,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUpOutline,
} from "@vkontakte/icons"
import { useState } from "react"
import { MemeListItem } from "../components"
import { MemeItem } from "../shared/proto/meme"
import {
    useRouteNavigator,
    useSearchParams,
} from "@vkontakte/vk-mini-apps-router"

export const Profile = ({ id }: IPanelProps) => {
    const user = $user.getState()
    const vkUser = $vkUserData.getState()
    const [selectedTab, setSelectedTab] = useState("likes")
    const [search, setSearch] = useState("")

    const tabContent = {
        likes: TabContentLikes(),
        dislikes: TabContentDislikes(),
        favorites: TabContentFavorites(),
    }[selectedTab]

    const searchPlaceholer = {
        likes: "Искать в лайках",
        dislikes: "Искать в дизлайках",
        favorites: "Искать в избранных",
    }[selectedTab]

    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group>
                <div className={styles.userInfoContainer}>
                    <Avatar size={96} src={vkUser?.photo_200} />
                    <Title
                        style={{ marginBottom: 8, marginTop: 20 }}
                        level="2"
                        weight="2"
                    >
                        {user?.name || "Загрузочка..."}
                    </Title>
                </div>

                <Tabs mode={"accent"}>
                    <HorizontalScroll arrowSize={"m"}>
                        <TabsItem
                            selected={selectedTab === "likes"}
                            onClick={() => setSelectedTab("likes")}
                            before={<Icon24ThumbsUpOutline />}
                            status={user?.likesCount || 0}
                        >
                            Лайки
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "dislikes"}
                            onClick={() => setSelectedTab("dislikes")}
                            before={<Icon24ThumbsDownOutline />}
                            status={user?.dislikesCount || 0}
                        >
                            Дизлайки
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "favorites"}
                            onClick={() => setSelectedTab("favorites")}
                            before={<Icon24BookmarkOutline />}
                            status={user?.favoritesCount || 0}
                        >
                            Избранное
                        </TabsItem>
                    </HorizontalScroll>
                </Tabs>

                <Search
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    after={null}
                    placeholder={searchPlaceholer}
                />

                <div className={styles.tabContentContainer}>{tabContent}</div>
            </Group>
        </Panel>
    )
}

const TabContentLikes = () => {
    const navigator = useRouteNavigator()
    const [params, setParams] = useSearchParams()

    const openModal = (memeId: number) => {
        params.set("list", "likes")
        params.set("memeId", `${memeId}`)
        setParams(params)

        navigator.showModal(Modals.PROFILE_MEME_LIST_ACTIONS)
    }

    return (
        <div className={styles.cardsContainer}>
            {mockedLikesList.map((item) => (
                <MemeListItem item={item} onClick={openModal}></MemeListItem>
            ))}
        </div>
    )
}

const TabContentDislikes = () => {
    const navigator = useRouteNavigator()
    const [params, setParams] = useSearchParams()

    const openModal = (memeId: number) => {
        params.set("list", "dislikes")
        params.set("memeId", `${memeId}`)
        setParams(params)

        navigator.showModal(Modals.PROFILE_MEME_LIST_ACTIONS)
    }

    return (
        <div className={styles.cardsContainer}>
            {mockedLikesList.map((item) => (
                <MemeListItem item={item} onClick={openModal}></MemeListItem>
            ))}
        </div>
    )
}

const TabContentFavorites = () => {
    const navigator = useRouteNavigator()
    const [params, setParams] = useSearchParams()

    const openModal = (memeId: number) => {
        params.set("list", "favorites")
        params.set("memeId", `${memeId}`)
        setParams(params)

        navigator.showModal(Modals.PROFILE_MEME_LIST_ACTIONS)
    }

    return (
        <div className={styles.cardsContainer}>
            {mockedLikesList.map((item) => (
                <MemeListItem item={item} onClick={openModal}></MemeListItem>
            ))}
        </div>
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
