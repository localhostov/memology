import { connectWs, disconnectWs, WebsocketServer } from "@shared"
import { useEffect } from "react"

export function useWebsocket<T extends keyof WebsocketServer>(
    game: T,
    handlers: {
        [K in keyof NonNullable<WebsocketServer[T]>]: (
            msg: NonNullable<NonNullable<WebsocketServer[T]>[K]>,
        ) => void
    },
) {
    const handler = (msg: WebsocketServer) => {
        const gameData = msg[game]!
        const eventName = Object.keys(gameData)[0]! as keyof NonNullable<
            WebsocketServer[T]
        >

        const handler = handlers[eventName]
        if (!handler)
            return console.error(`Event ${String(eventName)} not implemented`)

        handler(msg[game]![eventName]!)
    }

    useEffect(() => {
        connectWs({ game, handler })

        return disconnectWs
    }, [])
}
