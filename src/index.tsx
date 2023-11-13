import "@vkontakte/vkui/dist/vkui.css"
import "./root.css"
import { attachReduxDevTools } from "@effector/redux-devtools-adapter"
import { init } from "@shared"
import ReactDOM from "react-dom/client"
import { App } from "./views/App"

//TODO: only in dev mode
attachReduxDevTools()

init()

const root = document.querySelector("#root")!

ReactDOM.createRoot(root).render(<App />)
