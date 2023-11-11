import { Icon28NewsfeedOutline } from "@vkontakte/icons"
import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router"
import { useLocation } from "@vkontakte/vk-mini-apps-router/dist/hooks/hooks"
import { PanelPage } from "@vkontakte/vk-mini-apps-router/dist/page-types/PanelPage"
import { ViewConfig } from "@vkontakte/vk-mini-apps-router/dist/page-types/ViewConfig"
import {
    Cell,
    Epic as VKUIEpic,
    Group,
    Panel,
    PanelHeader,
    Platform,
    SplitCol,
    SplitLayout,
    Tabbar,
    TabbarItem,
    useAdaptivityConditionalRender,
    usePlatform,
} from "@vkontakte/vkui"
import { Games, Meme, Memes } from "../panels"
import { panelNames, Panels, routes } from "../shared"

export const Epic = () => {
    const platform = usePlatform()
    const { panel: activePanel } = useActiveVkuiLocation()
    const navigator = useRouteNavigator()
    const location = useLocation()

    const { viewWidth } = useAdaptivityConditionalRender()
    const activeStoryStyles = {
        backgroundColor: "var(--vkui--color_background_secondary)",
        borderRadius: 8,
    }

    const onStoryChange = (panel: PanelPage<string>) => {
        if (location.pathname === panel.path) return

        navigator
            .replace(panel)
            .then(() => console.log(`change tab to ${panel.path}`))
    }

    const hasHeader = platform !== Platform.VKCOM

    const checkTabIsActive = (view: ViewConfig<string>) => {
        return view
            .getRoutes()
            .map((it) => it.panel)
            .includes(activePanel!)
    }

    const memesTabIsActive = checkTabIsActive(routes.root.memes)
    const gamesTabIsActive = checkTabIsActive(routes.root.games)

    return (
        <SplitLayout
            header={hasHeader && <PanelHeader separator={false} />}
            style={{ justifyContent: "center" }}
        >
            {viewWidth.tabletPlus && (
                <SplitCol
                    className={viewWidth.tabletPlus.className}
                    fixed
                    width={280}
                    maxWidth={280}
                >
                    <Panel>
                        {hasHeader && <PanelHeader />}
                        <Group>
                            <Cell
                                disabled={memesTabIsActive}
                                style={
                                    memesTabIsActive
                                        ? activeStoryStyles
                                        : undefined
                                }
                                onClick={() =>
                                    onStoryChange(routes.root.memes.memes)
                                }
                                before={<Icon28NewsfeedOutline />}
                            >
                                {panelNames[Panels.MEMES]}
                            </Cell>
                            <Cell
                                disabled={gamesTabIsActive}
                                style={
                                    gamesTabIsActive
                                        ? activeStoryStyles
                                        : undefined
                                }
                                onClick={() =>
                                    onStoryChange(routes.root.games.games)
                                }
                                before={<Icon28NewsfeedOutline />}
                            >
                                {panelNames[Panels.GAMES]}
                            </Cell>
                        </Group>
                    </Panel>
                </SplitCol>
            )}

            <SplitCol
                width="100%"
                maxWidth="860px"
                stretchedOnMobile
                autoSpaced
            >
                <VKUIEpic
                    activeStory={activePanel ?? Panels.MEMES}
                    tabbar={
                        viewWidth.tabletMinus && (
                            <Tabbar className={viewWidth.tabletMinus.className}>
                                <TabbarItem
                                    disabled={memesTabIsActive}
                                    onClick={() =>
                                        onStoryChange(routes.root.memes.memes)
                                    }
                                    selected={memesTabIsActive}
                                    text={panelNames[Panels.MEMES]}
                                >
                                    <Icon28NewsfeedOutline />
                                </TabbarItem>

                                <TabbarItem
                                    disabled={gamesTabIsActive}
                                    onClick={() =>
                                        onStoryChange(routes.root.games.games)
                                    }
                                    selected={gamesTabIsActive}
                                    text={panelNames[Panels.GAMES]}
                                >
                                    <Icon28NewsfeedOutline />
                                </TabbarItem>
                            </Tabbar>
                        )
                    }
                >
                    <Memes id={Panels.MEMES} />
                    <Games id={Panels.GAMES} />
                    <Meme id={Panels.MEME} />
                </VKUIEpic>
            </SplitCol>
        </SplitLayout>
    )
}
