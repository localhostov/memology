import {
    Icon24BookmarkOutline,
    Icon24ThumbsDownOutline,
    Icon24ThumbsUpOutline,
} from "@vkontakte/icons"
import {
    Avatar,
    Group,
    HorizontalScroll,
    Panel,
    PanelHeader,
    Tabs,
    TabsItem,
    Title,
} from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { ProfileTabList } from "../components"
import { $user, $vkUserData, panelNames, ProfileEffects } from "../shared"
import styles from "../styles/profile.module.css"
import { IPanelProps } from "../types"

export const Profile = ({ id }: IPanelProps) => {
    const user = useUnit($user)
    const vkUser = useUnit($vkUserData)
    const selectedTab = useUnit(ProfileEffects.$selectedTab)

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

                <Tabs mode="accent">
                    <HorizontalScroll arrowSize="m">
                        <TabsItem
                            selected={selectedTab === "like"}
                            onClick={() => ProfileEffects.selectTab("like")}
                            before={<Icon24ThumbsUpOutline />}
                            status={user?.likesCount || 0}
                        >
                            Лайки
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "dislike"}
                            onClick={() => ProfileEffects.selectTab("dislike")}
                            before={<Icon24ThumbsDownOutline />}
                            status={user?.dislikesCount || 0}
                        >
                            Дизлайки
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "favorite"}
                            onClick={() => ProfileEffects.selectTab("favorite")}
                            before={<Icon24BookmarkOutline />}
                            status={user?.favoritesCount || 0}
                        >
                            Избранное
                        </TabsItem>
                    </HorizontalScroll>
                </Tabs>

                <ProfileTabList type={selectedTab} />
            </Group>
        </Panel>
    )
}
