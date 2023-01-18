import { useEffect, useMemo, useState } from "react";
import ScoreCard from "./ScoreCard";
import Words from "./Words";
import GhotiModel, { Guess } from "../model/GhotiModel";
import Message from "./Message";
import { playBadSound, playGoodSound, playOldSound } from "../util/helper";
import { Dialog } from "@headlessui/react";

const GAME_TIME = 20;
let timerCreated = false;

type MyProps = {
    model: GhotiModel;
};
const Game = ({ model }: MyProps) => {
    const [paused, setPaused] = useState(false);
    const [finished, setFinished] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [timeStr, setTimeStr] = useState("");
    const [count, setCount] = useState(GAME_TIME);

    useEffect(() => {
        if (count > 1) {
            if (!finished) {
                if (paused) {
                    setTimeStr("PAUSED");
                    console.log("timer is paused");
                } else {
                    const minutes = Math.floor(count / 60);
                    const seconds = count - minutes * 60;
                    const formatSeconds =
                        seconds < 10 ? "0" + seconds : +seconds;

                    setTimeStr(`${minutes} : ${formatSeconds}`);

                    const timer = setTimeout(
                        () => !paused && setCount(count - 1),
                        1e3
                    );

                    console.log("UpdateTimer: calling for secs: ", count);
                    return () => clearTimeout(timer);
                }
            }
        } else {
            setTimeStr("PAUSED");
            setPaused(true);
            setFinished(true);
        }
    }, [count, paused, finished, model]);

    useEffect(() => {
        if (finished && model.isSuccess()) {
            setSuccess(true);
        }
    }, [finished]);

    const CreateTimer = () => {
        setCount(GAME_TIME);
        console.log("Creating timer");
    };
    const reset = () => {
        setPaused(false);
        setFinished(false);
        setSuccess(false);
        setMessage("");
    };
    const nextRound = () => {
        if (!success) {
            restart();
        } else {
            console.log("Next round");
            reset();
            model.newRound();
            CreateTimer();
        }
    };

    // enter guesses a word
    const handleEnter = () => {
        const result = model.makeGuess();
        if (result === Guess.BAD_GUESS) {
            playBadSound();
        } else if (result === Guess.ALREADY_GUESSED) {
            playOldSound();
        } else {
            playGoodSound();
        }

        if (model.isFinished()) {
            setSuccess(true);
        }
    };

    // escape toggles the game paused state
    const handleEsc = () => {
        console.log("setting paused: ", !paused);
        setPaused(!paused);
    };

    // delete cheats
    const handleDel = () => {
        setMessage(`Your word is: ${model.getCurrentWord()}`);
        console.log("Your paused setting is: ", paused);
    };

    // backspace removes the previous letter from the guess
    const handleBackspace = () => {
        model.undoPrevGuess();
    };

    // tab shuffles the letters
    const handleTab = () => {
        model.shuffle();
    };

    // the main key event callback
    const handleKeyPress = (event: KeyboardEvent) => {
        event.preventDefault();

        const key = event.key;

        if (key === "Escape") {
            handleEsc();
        } else if (key === "Delete") {
            handleDel();
        } else if (!paused) {
            if (key === "Backspace") {
                handleBackspace();
            } else if (key === "Enter") {
                handleEnter();
            } else if (key === "Tab") {
                handleTab();
            } else {
                const char = key.toUpperCase();
                if (model.checkChar(char)) {
                    model.wordToGuess(char);
                }
            }
        }
    };

    useEffect(() => {
        if (!timerCreated) {
            window.addEventListener("keydown", (e) => handleKeyPress(e));
            console.log("mounting listener");
            CreateTimer();
            timerCreated = true;
        }
        return () => {
            window.removeEventListener("keydown", (e) => handleKeyPress(e));
            console.log("unmounting listener");
        };
    }, []);

    const restart = () => {
        console.log("Game.restart");
        model.restart();
        reset();

        CreateTimer();
    };

    return (
        <div className="clearfix">
            <Dialog
                open={finished}
                onClose={() => nextRound()}
                className="relative z-50"
            >
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-sm rounded bg-slate-500 p-4 text-center">
                        <Dialog.Title className="text-center">
                            {success
                                ? "Congratulations!"
                                : "Aw... You didn't complete the round!"}
                        </Dialog.Title>
                        <Dialog.Description>
                            {success
                                ? "You can proceed to the next round!"
                                : "Would you like to restart?"}
                        </Dialog.Description>
                        <button
                            className="inline-flex items-center rounded border border-transparent bg-indigo-600 mt-2 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => nextRound()}
                        >
                            {success ? "Proceed" : "Restart"}
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <Dialog
                open={!finished && paused}
                onClose={() => setPaused(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-sm rounded bg-slate-500 p-4 text-center">
                        <Dialog.Title className="text-center">
                            Ghoti is Paused
                        </Dialog.Title>
                        <Dialog.Description>
                            You can breathe easy, your game is paused!
                        </Dialog.Description>
                        <button
                            className="inline-flex items-center rounded border border-transparent bg-indigo-600 mt-2 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setPaused(false)}
                        >
                            Resume
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <div className="flex mt-6 mr-2 absolute top-0 right-0">
                <div className="mt-6 mr-2" id="timer">
                    {timeStr}
                </div>

                <button
                    className=" rounded-3xl border border-transparent bg-indigo-600 px-2 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setPaused(true)}
                >
                    Pause Game
                </button>
            </div>

            <Message message={message} />

            <div className="">
                <div className="mt-10 max-h-[600px]">
                    <Words
                        model={model}
                        finished={finished}
                        wordList={model.getCurrentWordList()}
                    />
                </div>
                <div className="mt-6">
                    <ScoreCard model={model} />
                </div>
            </div>
        </div>
    );
};
export default Game;
