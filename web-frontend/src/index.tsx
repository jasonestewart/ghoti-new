import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index2.css";
import Ghoti from "./components/Ghoti";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Ghoti />
    </React.StrictMode>
);
