import Game from "./Game";
import GhotiModel from "../model/GhotiModel";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./Header";
import "../App.css";
import WordService from "../services/wordService";

let initialized = false;

const Ghoti = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [model, setModel] = useState<GhotiModel>();

    useEffect(() => {
        if (!initialized) {
            initialized = true;
            const service = new WordService();
            setModel(new GhotiModel(service));
            console.log(`word service has ${service.wordCount} words`);
        }
      }, []);
    
    const start = async () => {
        console.log("starting game");

        model!.restart();
        setIsOpen(false);
    };

    return (
        <>
            <div id="home_wrap">
                <Header />

                <Dialog
                    open={isOpen}
                    onClose={() => start()}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 flex bg-black/30 items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-sm rounded bg-slate-500 p-4 text-center">
                            <Dialog.Title className="text-center">
                                Start Ghoti
                            </Dialog.Title>
                            <Dialog.Description>
                                This will start the game
                            </Dialog.Description>

                            <p>Good Luck</p>

                            <button
                                className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => start()}
                            >
                                Start
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>
                {!isOpen && model && <Game model={model} />}
            </div>
        </>
    );
};

export default Ghoti;
