import { MemeItem, panelNames } from "@shared"
import { IPanelProps } from "@types"
import bridge from "@vkontakte/vk-bridge"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Avatar,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
} from "@vkontakte/vkui"
import styles from "./meme.module.css"

export const Meme = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()

    const openImage = () => {
        bridge.send("VKWebAppShowImages", {
            images: [memeInfo.image],
        })
    }

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => navigator.back()} />}
            >
                {panelNames[id]}
            </PanelHeader>

            <Group>
                <div className={styles.imageContainer}>
                    <img
                        src={memeInfo.image}
                        className={styles.image}
                        onClick={openImage}
                        alt=""
                    />

                    <div>
                        <div className={styles.title}>{memeInfo.title}</div>
                        <div className={styles.description}>
                            {memeInfo.description}
                        </div>

                        <div style={{ height: 8 }} />

                        <div className={styles.imageContainerInfo}>
                            <SimpleCell
                                before={<Avatar size={36} />}
                                style={{ paddingLeft: 0, borderRadius: 100 }}
                                subtitle="Автор мема"
                            >
                                Александр Локалхостов
                            </SimpleCell>

                            <div className={styles.placeInRating}>
                                #1 в недельном рейтинге
                            </div>
                        </div>
                    </div>
                </div>
            </Group>
        </Panel>
    )
}

const memeInfo: MemeItem = {
    description:
        "Lorem ipsum dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor",
    favoritesCount: 0,
    id: 0,
    image: "https://www.neredeoku.com/gorsel/ankara/etimesgut/ozel-asfa-ankara-ferda-koleji-098e6f5ecae42c26a940ad4a6c7.jpg",
    isFavorites: false,
    likesCount: 0,
    title: "Some title meme",
}
