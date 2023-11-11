import {
    Icon28NewsfeedOutline,
    Icon28GameOutline,
    Icon28PollSquareOutline,
} from "@vkontakte/icons"
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
import { Games, Meme, Memes, Rating } from "../panels"
import { panelNames, Panels, routes } from "../shared"
import { ITab } from "../types"

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

    const tabs: ITab[] = [
        {
            title: panelNames[Panels.MEMES],
            isActive: checkTabIsActive(routes.root.memes),
            route: routes.root.memes.memes,
            icon: <Icon28NewsfeedOutline />,
        },
        {
            title: panelNames[Panels.GAMES],
            isActive: checkTabIsActive(routes.root.games),
            route: routes.root.games.games,
            icon: <Icon28GameOutline />,
        },
        {
            title: panelNames[Panels.RATING],
            isActive: checkTabIsActive(routes.root.rating),
            route: routes.root.rating.rating,
            icon: <Icon28PollSquareOutline />,
        },
    ]

    const desktopTabs = tabs.map((tab) => {
        return (
            <Cell
                disabled={tab.isActive}
                style={tab.isActive ? activeStoryStyles : undefined}
                onClick={() => onStoryChange(tab.route)}
                before={tab.icon}
            >
                {tab.title}
            </Cell>
        )
    })

    const mobileTabs = tabs.map((tab) => {
        return (
            <TabbarItem
                disabled={tab.isActive}
                onClick={() => onStoryChange(tab.route)}
                selected={tab.isActive}
                text={tab.title}
            >
                {tab.icon}
            </TabbarItem>
        )
    })

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
                        <Group>{desktopTabs}</Group>
                    </Panel>
                </SplitCol>
            )}

            <SplitCol
                width="100%"
                maxWidth="680px"
                stretchedOnMobile
                autoSpaced
            >
                <VKUIEpic
                    activeStory={activePanel ?? Panels.MEMES}
                    tabbar={
                        viewWidth.tabletMinus && (
                            <Tabbar className={viewWidth.tabletMinus.className}>
                                {mobileTabs}
                            </Tabbar>
                        )
                    }
                >
                    <Memes id={Panels.MEMES} />
                    <Games id={Panels.GAMES} />
                    <Meme id={Panels.MEME} />
                    <Rating id={Panels.RATING} />
                </VKUIEpic>
            </SplitCol>
        </SplitLayout>
    )
}
