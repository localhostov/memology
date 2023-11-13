import { Icon24Globe, Icon24PollOutline } from "@vkontakte/icons"
import {
    Group,
    HorizontalScroll,
    Panel,
    PanelHeader,
    Tabs,
    TabsItem,
} from "@vkontakte/vkui"
import { useUnit } from "effector-react/compat"
import { ReactElement } from "react"
import { RatingListItem } from "../../components"
import { panelNames, RatingEffects } from "../../shared"
import { IPanelProps, TRatingTabListType } from "../../types"
import styles from "./rating.module.css"

export const Rating = ({ id }: IPanelProps) => {
    const selectedTab = useUnit(RatingEffects.$selectedTab)

    const tabContent: Record<TRatingTabListType, ReactElement> = {
        eternal: TabContentEternal(),
        weekly: TabContentWeekly(),
    }

    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group>
                <Tabs mode="accent">
                    <HorizontalScroll arrowSize="m">
                        <TabsItem
                            selected={selectedTab === "eternal"}
                            onClick={() => RatingEffects.selectTab("eternal")}
                            before={<Icon24Globe />}
                        >
                            Постоянный
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "weekly"}
                            onClick={() => RatingEffects.selectTab("weekly")}
                            before={<Icon24PollOutline />}
                        >
                            Недельный
                        </TabsItem>
                    </HorizontalScroll>
                </Tabs>

                {tabContent[selectedTab]}
            </Group>
        </Panel>
    )
}

const TabContentEternal = () => {
    return (
        <div className={styles.tabContentContainer}>
            <div className={styles.listContainer}>
                {mockedEternalRatingList.map((item, index) => (
                    <RatingListItem
                        key={item.id}
                        item={item}
                        place={index + 1}
                    />
                ))}
            </div>
        </div>
    )
}

const TabContentWeekly = () => {
    return (
        <div className={styles.tabContentContainer}>
            контент недельного рейтинга
        </div>
    )
}

export interface RatingItem {
    id: number
    title: string
    description: string
    image: string
    likes: number
    bookmarks: number
    inFavorites: boolean
    favoritesCount: number
    likesCount: number
}

const mockedEternalRatingList: RatingItem[] = [
    {
        id: 0,
        title: "Это название мема",
        description: "Какое-то короткое описание",
        image: "https://i.ytimg.com/vi/ny8QQ9dKH9k/maxresdefault.jpg",
        likes: 0,
        bookmarks: 0,
        inFavorites: false,
        favoritesCount: 0,
        likesCount: 10,
    },
    {
        id: 1,
        title: "А это ещё одно название какого-то мема, но уже немного более длинное",
        description:
            "А здесь по аналогии с названием тоже некое очень длинное описание, которое обязательно должно быть сокращено бла бла бла бла бба",
        image: "https://i.ytimg.com/vi/ny8QQ9dKH9k/maxresdefault.jpg",
        likes: 10,
        bookmarks: 10,
        inFavorites: true,
        favoritesCount: 1,
        likesCount: 5,
    },
]
