import {
    createHashRouter,
    createPanel,
    createRoot,
    createView,
    RoutesConfig,
} from "@vkontakte/vk-mini-apps-router"

export enum Panels {
    MEMES = "memes",
    MEMES_NAME = "Мемы",

    GAMES = "games",
    GAMES_NAME = "Игры",

    MEME = "meme",
    MEME_NAME = "О меме",
}

export const routes = RoutesConfig.create([
    createRoot("root", [
        createView(Panels.MEMES, [
            createPanel(Panels.MEMES, "/"),
            createPanel(Panels.MEME, "/meme/:memeId"),
        ]),

        createView(Panels.GAMES, [createPanel(Panels.GAMES, "/games")]),
    ]),
])

export const router = createHashRouter(routes.getRoutes())
