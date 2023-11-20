import { $vkUserData } from "@shared"
import bridge, { UserInfo } from "@vkontakte/vk-bridge"
import { Avatar } from "@vkontakte/vkui"
import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import { IAlbumItem } from "../../panels"
import styles from "./styles.module.css"

export const HistoryAlbumListItem = ({ item }: { item: IAlbumItem }) => {
    const vkUserData = useUnit($vkUserData)
    const [userData, setUserData] = useState<UserInfo | null>(null)
    const isLoading = false

    useEffect(() => {
        bridge
            .send("VKWebAppGetUserInfo", {
                user_id: item.vkId,
            })
            .then((data) => setUserData(data))
    }, [])

    return (
        <div className={styles.container}>
            <Avatar size={40} src={userData?.photo_200} />
            <div>
                <div className={styles.username}>
                    {userData?.first_name} {userData?.last_name}
                </div>

                <div style={{ height: 8 }} />

                <div
                    className={styles.bubble}
                    style={{
                        background: isLoading
                            ? "none"
                            : vkUserData?.id === item.vkId
                              ? "var(--vkui--color_accent_blue)"
                              : "var(--vkui--color_background_secondary)",
                        color:
                            vkUserData?.id === item.vkId
                                ? "white"
                                : "--vkui--color_text_primary",
                    }}
                >
                    {isLoading ? (
                        <div className={styles.loading} />
                    ) : (
                        item.phrase
                    )}
                </div>
            </div>
        </div>
    )
}
