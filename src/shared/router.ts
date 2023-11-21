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
    GAME_HISTORY = "gameHistory",
}

export const panelNames: Record<Panels, string> = {
    [Panels.MEMES]: "Мемы",
    [Panels.GAMES]: "Игры",
    [Panels.MEME]: "О меме",
    [Panels.RATING]: "Рейтинг",
    [Panels.SUGGEST]: "Предложить мем",
    [Panels.PROFILE]: "Профиль",
    [Panels.GAME_HISTORY]: "История",
}

export enum Modals {
    PROFILE_MEME_LIST_ACTIONS = "profileMemeListActions",
    CREATE_MEME_COMMENT = "createMemeComment",
    COMMENT_USER_ACTIONS = "commentUserActions",
    GAME_INFO_PREVIEW = "gameInfoPreview",
    EXIT_FROM_GAME_CONFIRMATION = "exitFromGameConfirmation",
    GAME_INVITE = "gameInvite",
    HISTORY_GIF_PREVIEW = "historyGifPreview",
}

export const routes = RoutesConfig.create([
    createRoot("root", [
        createView(Panels.MEMES, [
            createPanel(Panels.MEMES, "/"),
            createPanel(Panels.MEME, "/meme/:memeId", [
                createModal(
                    Modals.CREATE_MEME_COMMENT,
                    "/meme/:memeId/comment",
                ),
                createModal(
                    Modals.COMMENT_USER_ACTIONS,
                    "/meme/:memeId/comment/:commentId/actions",
                ),
            ]),
            createPanel(Panels.SUGGEST, "/suggest"),
        ]),

        createView(Panels.GAMES, [
            createPanel(Panels.GAMES, "/games", [
                createModal(Modals.GAME_INFO_PREVIEW, "/games/preview/:mode"),
                createModal(Modals.GAME_INVITE, "/games/:mode/invite/:gameId"),
            ]),
            createPanel(Panels.GAME_HISTORY, "/games/history/:roomId", [
                createModal(Modals.EXIT_FROM_GAME_CONFIRMATION, "exit"),
                createModal(Modals.HISTORY_GIF_PREVIEW, "gif"),
            ]),
        ]),

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
