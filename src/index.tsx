import "@vkontakte/vkui/dist/vkui.css"
import { attachReduxDevTools } from "@effector/redux-devtools-adapter"
import ReactDOM from "react-dom/client"
import { init } from "./shared"
import { App } from "./views/App"

//TODO: only in dev mode
attachReduxDevTools()

init()

const root = document.querySelector("#root")!

ReactDOM.createRoot(root).render(<App />)
