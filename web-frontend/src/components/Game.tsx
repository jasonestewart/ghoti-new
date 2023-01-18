import { useCallback, useEffect, useMemo, useState } from "react";
import ScoreCard from "./ScoreCard";
import Words from "./Words";
import GhotiModel, { Guess } from "../model/GhotiModel";
import Message from "./Message";
import { Dialog } from "@headlessui/react";
import Score from "./Score";
import Letters from "./Letters";
import { playBadSound, playGoodSound, playOldSound } from "../util/helper";
import useEventListener from "@use-it/event-listener";

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
    const [lastKey, setLastKey] = useState("");

    let handled = false;

    // the main key event callback
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        event.preventDefault();

        if (handled || !model) return;

        handled = true;
        const key = event.key;
        setLastKey(key);

        if (key === "Delete") {
            setMessage(`Your word is: ${model.getCurrentWord()}`);
        } else if (key === "Backspace") {
            model.undoPrevGuess();
        } else if (key === "Enter") {
            const result = model.makeGuess();
            if (result === Guess.BAD_GUESS) {
                playBadSound();
            } else if (result === Guess.ALREADY_GUESSED) {
                playOldSound();
            } else {
                playGoodSound();
            }
        } else if (key === "Tab") {
            model.shuffle();
        } else {
            const char = key.toUpperCase();
            model.wordToGuess(char);
        }
        handled = false;
    }, []);

    useEventListener("keydown", handleKeyPress);

    useEffect(() => {
        if (!timerCreated) {
            console.log("Creating Timer");
            CreateTimer();
            timerCreated = true;
        }
    }, []);

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
    }, [count, paused, finished]);

    useEffect(() => {
        if (finished && model.isSuccess()) {
            setSuccess(true);
        }
    }, [finished, model]);

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

    const restart = () => {
        console.log("Game.restart");
        model.restart();
        reset();

        CreateTimer();
    };

    const wordList = useMemo(() => {
        return model.getCurrentWordList();
    }, [model, finished]);

    const guessedWordList = useMemo(() => {
        return model.getGuessedWordList();
    }, [model, finished]);

    return (
        <div className="clearfix">
            <Dialog
                open={finished}
                onClose={() => nextRound()}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-slate-700/75 flex items-center justify-center p-4">
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
                <div className="fixed inset-0 flex bg-slate-500 items-center justify-center p-4">
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

            <div className="mt-10 max-h-[600px]">
                <Words
                    finished={finished}
                    wordList={wordList}
                    guessedWordList={guessedWordList}
                />
            </div>
            <div className="mt-6">
                <div id="type_area" className="flex">
                    <Score
                        score={model.getScore()}
                        percent={Math.floor(model.getPercent() * 100)}
                        round={model.getRound()}
                    />
                    <Letters
                        prefix="avail"
                        letters={model.getAvailableLetters()}
                    />
                    <Letters
                        prefix="guess"
                        letters={model.getGuessedLetters()}
                    />
                </div>
            </div>
        </div>
    );
};
export default Game;
