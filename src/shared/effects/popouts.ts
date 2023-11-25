import { createEvent, restore } from "effector"
import { ReactElement } from "react"

export const setSnackbar = createEvent<ReactElement | null>()
export const $snackbar = restore(setSnackbar, null)

export const setPopout = createEvent<ReactElement | null>()
export const $popout = restore(setPopout, null)
