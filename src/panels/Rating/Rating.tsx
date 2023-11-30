import { MainTabPanelHeader, RatingListItem } from "@components"
import { panelNames, RatingEffects } from "@shared"
import { IPanelProps } from "@types"
import { Icon24Globe, Icon24PollOutline } from "@vkontakte/icons"
import {
    Group,
    HorizontalScroll,
    Panel,
    Spinner,
    Tabs,
    TabsItem,
} from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { useEffect } from "react"
import styles from "./styles.module.css"

export const Rating = ({ id }: IPanelProps) => {
    const selectedTab = useUnit(RatingEffects.$selectedTab)
    const ratingIsLoading = useUnit(RatingEffects.getRatingItemsFx.pending)
    const ratingItems = useUnit(RatingEffects.$items)

    useEffect(() => {
        RatingEffects.fetchRatingItems()
    }, [])

    const renderedRating = useList(RatingEffects.$items, (item) => (
        <RatingListItem key={item.id} item={item} />
    ))

    return (
        <Panel id={id}>
            <MainTabPanelHeader children={panelNames[id]} />

            <Group>
                <Tabs>
                    <HorizontalScroll arrowSize="m">
                        <TabsItem
                            selected={selectedTab === "eternal"}
                            onClick={() =>
                                selectedTab !== "eternal" &&
                                RatingEffects.selectTab("eternal")
                            }
                            before={<Icon24Globe />}
                        >
                            Постоянный
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "weekly"}
                            onClick={() =>
                                selectedTab !== "weekly" &&
                                RatingEffects.selectTab("weekly")
                            }
                            before={<Icon24PollOutline />}
                        >
                            Недельный
                        </TabsItem>
                    </HorizontalScroll>
                </Tabs>

                {ratingIsLoading && ratingItems.length === 0 ? (
                    <div style={{ margin: 32 }}>
                        <Spinner size="large" />
                    </div>
                ) : (
                    <div className={styles.tabContentContainer}>
                        <div className={styles.listContainer}>
                            {renderedRating}
                        </div>
                    </div>
                )}
            </Group>
        </Panel>
    )
}
