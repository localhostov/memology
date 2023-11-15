import { ProfileTabList } from "@components"
import {
    $user,
    $vkUserData,
    getUser,
    panelNames,
    ProfileEffects,
} from "@shared"
import { IPanelProps } from "@types"
import {
    Icon24BookmarkOutline,
    Icon24FolderSimpleUserOutline,
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
import { useEffect } from "react"
import styles from "./styles.module.css"

export const Profile = ({ id }: IPanelProps) => {
    const user = useUnit($user)
    const vkUser = useUnit($vkUserData)
    const selectedTab = useUnit(ProfileEffects.$selectedTab)

    useEffect(() => {
        getUser()
    }, [])

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
                            onClick={() =>
                                selectedTab !== "like" &&
                                ProfileEffects.selectTab("like")
                            }
                            before={<Icon24ThumbsUpOutline />}
                            status={user?.likesCount || 0}
                        >
                            Лайки
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "dislike"}
                            onClick={() =>
                                selectedTab !== "dislike" &&
                                ProfileEffects.selectTab("dislike")
                            }
                            before={<Icon24ThumbsDownOutline />}
                            status={user?.dislikesCount || 0}
                        >
                            Дизлайки
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "favorite"}
                            onClick={() =>
                                selectedTab !== "favorite" &&
                                ProfileEffects.selectTab("favorite")
                            }
                            before={<Icon24BookmarkOutline />}
                            status={user?.favoritesCount || 0}
                        >
                            Избранное
                        </TabsItem>

                        <TabsItem
                            selected={selectedTab === "my"}
                            onClick={() =>
                                selectedTab !== "my" &&
                                ProfileEffects.selectTab("my")
                            }
                            before={<Icon24FolderSimpleUserOutline />}
                            status={user?.favoritesCount || 0}
                        >
                            Мои мемы
                        </TabsItem>
                    </HorizontalScroll>
                </Tabs>

                <ProfileTabList type={selectedTab} />
            </Group>
        </Panel>
    )
}
