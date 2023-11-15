import { RatingListItem } from "@components"
import { panelNames, RatingEffects } from "@shared"
import { IPanelProps } from "@types"
import { Icon24Globe, Icon24PollOutline } from "@vkontakte/icons"
import {
    Group,
    HorizontalScroll,
    Panel,
    PanelHeader,
    Tabs,
    TabsItem,
} from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { useEffect } from "react"
import styles from "./styles.module.css"

export const Rating = ({ id }: IPanelProps) => {
    const selectedTab = useUnit(RatingEffects.$selectedTab)

    useEffect(() => {
        RatingEffects.fetchRatingItems()
    }, [])

    const renderedRating = useList(RatingEffects.$items, (item) => (
        <RatingListItem key={item.id} item={item} />
    ))

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

                <div className={styles.tabContentContainer}>
                    <div className={styles.listContainer}>{renderedRating}</div>
                </div>
            </Group>
        </Panel>
    )
}
