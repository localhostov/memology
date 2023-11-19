import { createEffect, createEvent, createStore, sample } from "effector"
import { WebsocketClient, WebsocketServer } from "../proto"

export interface IConnectWs {
    game: keyof WebsocketClient
    handler: (msg: WebsocketServer) => unknown
    roomId: string
}

export const $ws = createStore<WebSocket | null>(null)

export const connectSocketFx = createEffect(
    ({ game, handler, roomId }: IConnectWs) => {
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

        return ws
    },
)

export const connectWs = createEvent<IConnectWs>()

export const closeWsConnectionFx = createEffect((ws: WebSocket) => {
    ws.close()
    console.log("disconnneeect")
})
export const disconnectWs = createEvent()

$ws.on(connectSocketFx.doneData, (_, ws) => ws)

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
