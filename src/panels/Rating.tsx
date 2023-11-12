import {
    Group,
    HorizontalScroll,
    Panel,
    PanelHeader,
    Tabs,
    TabsItem,
} from "@vkontakte/vkui"
import { panelNames } from "../shared"
import { IPanelProps, TRatingTabListType } from "../types"
import { ReactElement, useState } from "react"
import { Icon24Globe, Icon24PollOutline } from "@vkontakte/icons"
import styles from "../styles/rating.module.css"
import { RatingListItem } from "../components"

export const Rating = ({ id }: IPanelProps) => {
    const [selectedTab, setSelectedTab] =
        useState<TRatingTabListType>("eternal")

    const tabContent: Record<TRatingTabListType, ReactElement> = {
        eternal: TabContentEternal(),
        weekly: TabContentWeekly(),
    }

    return (
        <Panel id={id}>
            <PanelHeader>{panelNames[id]}</PanelHeader>

            <Group>
                <Tabs mode={"accent"}>
                    <HorizontalScroll arrowSize={"m"}>
                        <TabsItem
                            selected={selectedTab === "eternal"}
                            onClick={() => setSelectedTab("eternal")}
                            before={<Icon24Globe />}
                        >
                            Постоянный
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "weekly"}
                            onClick={() => setSelectedTab("weekly")}
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
                {mockedEternalRatingList.map((item) => (
                    <RatingListItem item={item} />
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
    inMyBookmarks: boolean
}

const mockedEternalRatingList: RatingItem[] = [
    {
        id: 0,
        title: "adf",
        description: "sasdasdfasf",
        image: "https://i.ytimg.com/vi/ny8QQ9dKH9k/maxresdefault.jpg",
        likes: 0,
        bookmarks: 0,
        inMyBookmarks: false,
    },
    {
        id: 1,
        title: "22222",
        description: "sasdasdfasf",
        image: "https://i.ytimg.com/vi/ny8QQ9dKH9k/maxresdefault.jpg",
        likes: 10,
        bookmarks: 10,
        inMyBookmarks: true,
    },
]
