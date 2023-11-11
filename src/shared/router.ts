import {
    createHashRouter,
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
}

export const panelNames: Record<Panels, string> = {
    [Panels.MEMES]: "Мемы",
    [Panels.GAMES]: "Игры",
    [Panels.MEME]: "О меме",
    [Panels.RATING]: "Рейтинг",
}

export const routes = RoutesConfig.create([
    createRoot("root", [
        createView(Panels.MEMES, [
            createPanel(Panels.MEMES, "/"),
            createPanel(Panels.MEME, "/meme/:memeId"),
        ]),

        createView(Panels.GAMES, [createPanel(Panels.GAMES, "/games")]),

        createView(Panels.RATING, [createPanel(Panels.RATING, "/rating")]),
    ]),
])

export const router = createHashRouter(routes.getRoutes())
