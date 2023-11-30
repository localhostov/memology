import "@vkontakte/vkui/dist/vkui.css"
import "./root.css"
import { init } from "@shared"
import ReactDOM from "react-dom/client"
import { App } from "./views/App"

init()

const root = document.querySelector("#root")!

ReactDOM.createRoot(root).render(<App />)
