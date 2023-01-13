import Game from "./Game";
import GhotiModel from "../model/GhotiModel";
import { useState } from "react";
import StartInfo from "./StartInfo";

type MyProps = {
    model: GhotiModel;
};

const Ghoti = ({ model }: MyProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const start = async () => {
        console.log("starting game");

        await model.restart();
        setIsOpen(false);
    };

    if (isOpen) {
        return <StartInfo callback={start} />;
    }

    return <Game model={model} />;
};

export default Ghoti;
