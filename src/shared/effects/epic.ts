import { createEvent, createStore } from "effector"

export const $epicIsShowed = createStore<boolean>(true)
export const changeEpicVisibility = createEvent<boolean>()

$epicIsShowed.on(
    changeEpicVisibility,
    (_, currentVisibility) => currentVisibility,
)
