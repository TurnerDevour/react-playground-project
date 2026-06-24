import ReactPlayground from './ReactPlayground';
import {PlaygroundProvider} from "./ReactPlayground/PlaygroundProvider.tsx";

function App() {

    return (
        <PlaygroundProvider>
            <ReactPlayground/>
        </PlaygroundProvider>
    )
}

export default App

