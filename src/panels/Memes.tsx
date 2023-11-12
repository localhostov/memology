import {
    Icon16Dropdown,
    Icon28AddCircleOutline,
    Icon28SadFaceOutline,
} from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    PanelHeaderContext,
    Placeholder,
    Search,
    SimpleCell,
    Spinner,
} from "@vkontakte/vkui"
import { useList, useUnit } from "effector-react"
import { ChangeEvent, useEffect, useState } from "react"
import { MemeListItem } from "../components"
import {
    $memesList,
    $memesSearch,
    fetchMemes,
    getMemesListFx,
    panelNames,
    routes,
    searchMeme,
} from "../shared"
import styles from "../styles/memes.module.css"
import { IPanelProps } from "../types"

export const Memes = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const memes = useUnit($memesList)
    const search = useUnit($memesSearch)
    const isLoading = useUnit(getMemesListFx.pending)
    const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false)

    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        searchMeme(e.target.value)
    }

    useEffect(() => {
        fetchMemes()
    }, [])

    const memesList = useList($memesList, (item) => (
        <MemeListItem item={item} />
    ))

    return (
        <Panel id={id}>
            <PanelHeader>
                <PanelHeaderContent
                    aside={
                        <Icon16Dropdown
                            style={{
                                transform: `rotate(${
                                    contextMenuIsOpen ? "180deg" : "0"
                                })`,
                                transition: "0.3s all ease",
                            }}
                        />
                    }
                    onClick={() => setContextMenuIsOpen(true)}
                >
                    {panelNames[id]}
                </PanelHeaderContent>
            </PanelHeader>
            <PanelHeaderContext
                opened={contextMenuIsOpen}
                onClose={() => setContextMenuIsOpen(false)}
            >
                <SimpleCell
                    before={<Icon28AddCircleOutline />}
                    onClick={() => navigator.push(routes.root.memes.suggest)}
                >
                    Предложить свой мем
                </SimpleCell>
            </PanelHeaderContext>

            <Group style={{ padding: 16 }}>
                <Search
                    value={search}
                    onChange={onChangeSearchValue}
                    after={null}
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    placeholder="Поиск мемов"
                />

                {isLoading ? (
                    <Spinner size="medium" style={{ margin: "20px 0" }} />
                ) : memes.length > 0 ? (
                    <div className={styles.cardsContainer}>{memesList}</div>
                ) : (
                    <Placeholder
                        icon={
                            <Icon28SadFaceOutline
                                style={{ width: 86, height: 86 }}
                            />
                        }
                        header="Ничего не найдено"
                        action={
                            <Button
                                onClick={() =>
                                    navigator.push(routes.root.memes.suggest)
                                }
                            >
                                Предложить мем
                            </Button>
                        }
                    >
                        Похоже, у нас ещё нет ничего об этом меме. Но вы можете
                        предложить этот мем и мы обязательно его добавим
                    </Placeholder>
                )}
            </Group>
        </Panel>
    )
}
