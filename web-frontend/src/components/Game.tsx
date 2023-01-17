import { useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";
import Words from "./Words";
import GhotiModel, { Guess } from "../model/GhotiModel";
import Message from "./Message";
import { playBadSound, playGoodSound, playOldSound } from "../util/helper";

const GAME_TIME = 120;
let timerCreated = false;

type MyProps = {
    model: GhotiModel;
};
const Game = ({ model }: MyProps) => {
    const EMPTY = "";
    const [paused, setPaused] = useState(false);
    const [finished, setFinished] = useState(false);
    const [message, setMessage] = useState("");
    const [timeStr, setTimeStr] = useState("");
    const [lastLetter, setLastLetter] = useState("");
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
            let msg = "";
            if (model.isSuccess()) {
                msg =
                    "Congrats, you've made it to round " +
                    (model.getRound() + 1);
            } else {
                msg = "Too bad, Game over!";
            }

            setPaused(true);
            setFinished(true);
            setMessage(msg);
        }
    }, [count, paused, finished, model]);

    const CreateTimer = () => {
        setCount(GAME_TIME);
        console.log("Creating timer");
    };

    const nextRound = () => {
        console.log("Next round");

        model.newRound();
        setPaused(false);
        setFinished(false);
        setMessage("");

        CreateTimer();
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
            nextRound();
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
        setLastLetter(key);

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

    let newRound = <span></span>;
    if (finished) {
        if (model.isSuccess()) {
            newRound = <button onClick={() => nextRound()}>Proceed</button>;
        } else {
            newRound = <button onClick={() => restart()}>Restart</button>;
        }
    }

    const restart = () => {
        model.restart();
        setPaused(false);
        setFinished(false);
        setMessage("");

        CreateTimer();
    };

    return (
        <div className="clearfix">
            <div className="" id="timer">
                {timeStr}
            </div>
            <div>
                <button onClick={() => setPaused(true)}>pause</button>
                <button onClick={() => setPaused(false)}>resume</button>
            </div>
            <Message message={message} />
            {newRound}
            <Words model={model} finished={finished} />
            <br className="clear" />
          <ScoreCard model={model} />
        </div>
    );
};
export default Game;
