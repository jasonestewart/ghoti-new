import React from "react";
import GhotiModel from "../model/GhotiModel";
import Word from "./Word";

type MyProps = {
    model: GhotiModel;
    finished: boolean;
};

const Words = ({ model, finished }: MyProps) => {
    const makeWordLayout = () => {
        // store the <ul>s in an array before the return
        const completed: React.ReactNode[] = [];
        const wordList: string[] = model.getCurrentWordList();

        // order the words by size
        var orderedWords: string[][] = [];
        for (let i = 3; i <= 7; i++) {
            orderedWords[i] = [];
        }
        wordList.forEach((word) => {
            orderedWords[word.length].push(word.toUpperCase());
        });
        let ul = 0;
        // now that they're ordered, make columns of words
        orderedWords.forEach((array) => {
            // store the <li>s in an array before creating the <ul>
            let container: React.ReactNode[] = [];

            let count = 0;
            array.forEach((word) => {
                count++;

                if (count > 12) {
                    completed.push(<ul key={`ul-2-${count}`}>{container}</ul>);
                    container = [];
                    count = 0;
                }
                // store the word for later rendering
                container.push(
                    <Word
                        finished={finished}
                        word={word}
                        key={`word-${count}`}
                        hidden={!model.isAlreadyGuessed(word)}
                    />
                );
            });
            ul++;
            completed.push(<ul key={`ul-1-${ul}`}>{container}</ul>);
        });
        return <div>{completed}</div>;
    };
    return <div id="completed">{makeWordLayout()}</div>;
};

export default Words;
