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

    const start = () => {
        console.log("starting game");

        model!.restart();
        setIsOpen(false);
    };

    return (
        <>
            <div className="w-[750px] mx-auto">
                <Header />

                <Dialog
                    open={isOpen}
                    onClose={() => start()}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 mx-auto flex bg-black/30 items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-sm rounded bg-slate-500 p-4">
                            <Dialog.Title className=" bg-[#757575] border-solid border-[#969696] border-2 px-5 pt-5 rounded-lg">
                                <div>Ready to play?!</div>
                                <p className="text-[#B4B4B4]">
                                    Pass a level: Get the seven letter word
                                    and/or get more than 65% of the words.
                                </p>
                                <button
                                    className="inline-flex w-[150px] text-center m-2 mx-auto rounded-3xl border border-transparent bg-gray-600 px-2.5 py-1.5 text-l font-medium text-[#787C74] shadow-sm shadow-[#3A3838] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:border-[#78806C] hover:text-[#A4B44C]"
                                    onClick={() => start()}
                                >
                                    Play
                                </button>
                            </Dialog.Title>
                            <Dialog.Description className="text-[#B4B4B4]"></Dialog.Description>

                            <h3 className="my-2">Your influence</h3>
                            <p className="my-2">
                                This game provided to you, open source, by a
                                father/daughter duo, who simply wanted this game
                                and made it.
                            </p>
                            <p className="my-2">
                                Play with us - How can this game improve, how
                                will you effect the next step this game takes
                                towards being your favorite? We can't wait to
                                find out!
                            </p>
                            <p className="my-2">
                                Don't got ideas? This method is also a great
                                support:
                            </p>
                        </Dialog.Panel>
                    </div>
                </Dialog>

                {!isOpen && model && <Game model={model} />}
            </div>
        </>
    );
};

export default Ghoti;
