import { createEvent, createStore } from "effector"
import { ReactElement } from "react"

export const $snackbar = createStore<ReactElement | null>(null)
export const setSnackbar = createEvent<ReactElement | null>()

$snackbar.on(setSnackbar, (_, snackbar) => snackbar)

export const $popout = createStore<ReactElement | null>(null)
export const setPopout = createEvent<ReactElement | null>()

$popout.on(setPopout, (_, popout) => popout)
