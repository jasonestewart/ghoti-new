import Header from "./components/Header";
import "./App.css";
import GhotiModel from "./model/GhotiModel";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Ghoti from "./components/Ghoti";

const App = () => {
    const model = new GhotiModel();
    return (
        <>
            <div id="home_wrap">
                <Header />
                <Ghoti model={model} />
            </div>
        </>
    );
};

export default App;
