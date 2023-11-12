import {
    createHashRouter,
    createModal,
    createPanel,
    createRoot,
    createView,
    RoutesConfig,
} from "@vkontakte/vk-mini-apps-router"

export enum Panels {
    MEMES = "memes",
    GAMES = "games",
    MEME = "meme",
    RATING = "rating",
    SUGGEST = "suggest",
    PROFILE = "profile",
}

export const panelNames: Record<Panels, string> = {
    [Panels.MEMES]: "Мемы",
    [Panels.GAMES]: "Игры",
    [Panels.MEME]: "О меме",
    [Panels.RATING]: "Рейтинг",
    [Panels.SUGGEST]: "Предложить мем",
    [Panels.PROFILE]: "Профиль",
}

export enum Modals {
    PROFILE_MEME_LIST_ACTIONS = "profileMemeListActions",
}

export const routes = RoutesConfig.create([
    createRoot("root", [
        createView(Panels.MEMES, [
            createPanel(Panels.MEMES, "/"),
            createPanel(Panels.MEME, "/meme/:memeId"),
            createPanel(Panels.SUGGEST, "/suggest"),
        ]),

        createView(Panels.GAMES, [createPanel(Panels.GAMES, "/games")]),

        createView(Panels.RATING, [createPanel(Panels.RATING, "/rating")]),

        createView(Panels.PROFILE, [
            createPanel(Panels.PROFILE, "/me", [
                createModal(
                    Modals.PROFILE_MEME_LIST_ACTIONS,
                    "/me/profileMemeListActions/:list/:memeId",
                ),
            ]),
        ]),
    ]),
])

export const router = createHashRouter(routes.getRoutes())
