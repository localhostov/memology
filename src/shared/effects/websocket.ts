import { createEffect, createEvent, restore, sample } from "effector"
import { WebsocketClient, WebsocketServer } from "../proto"

export interface IConnectWs {
    game: keyof WebsocketClient
    handler: (msg: WebsocketServer) => unknown
    onClose: () => unknown
    roomId: string
}

export const connectSocketFx = createEffect(
    ({ game, handler, roomId, onClose }: IConnectWs) => {
        console.log(game)
        const ws = new WebSocket(
            `wss://memology.animaru.app/${game}/${roomId}?vk-params=${encodeURIComponent(
                window.location.search.slice(1),
            )}`,
        )
        ws.binaryType = "arraybuffer"

        ws.addEventListener("message", (msg: MessageEvent<ArrayBuffer>) => {
            const data = WebsocketServer.fromBinary(new Uint8Array(msg.data))
            console.log(data[game])
            handler(data)
        })
        ws.addEventListener("close", (event) => {
            console.log("disc", event)
            onClose()
        })

        return ws
    },
)
export const $ws = restore(connectSocketFx, null)
export const connectWs = createEvent<IConnectWs>()

export const closeWsConnectionFx = createEffect((ws: WebSocket) => {
    ws.close()
    console.log("disconnneeect")
})
export const disconnectWs = createEvent()

sample({
    clock: connectWs,
    target: connectSocketFx,
})

sample({
    source: $ws,
    clock: disconnectWs,
    filter: (ws): ws is WebSocket => ws !== null,
    target: closeWsConnectionFx,
})
