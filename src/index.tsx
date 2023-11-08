import "@vkontakte/vkui/dist/vkui.css"
import ReactDOM from "react-dom/client"
import { init } from "./shared"
import { App } from "./views/App"

init()

const root = document.querySelector("#root")!

ReactDOM.createRoot(root).render(<App />)
