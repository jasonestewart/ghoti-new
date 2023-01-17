import React, { useEffect, useState } from "react";
import GhotiModel from "../model/GhotiModel";
import Word from "./Word";

type MyProps = {
    model: GhotiModel;
    finished: boolean;
};

const Words = ({ model, finished }: MyProps) => {
    const [wordList, setWordList] = useState<string[]>([]);
    const [orderedWords, setOrderedWords] = useState<string[][]>([]);

    useEffect(() => {
        const wl = model.getCurrentWordList();
        setWordList(wl);
        console.log("found word list: ", wl);
    }, [model]);

    useEffect(() => {
        let ow: string[][] = [];
        for (let i = 3; i <= 7; i++) {
            ow[i] = [];
        }

        wordList.forEach((word) => {
            ow[word.length].push(word.toUpperCase());
        });
        console.log("found ordered word list: ", ow);
        setOrderedWords(ow);
    }, [wordList]);

    if (!wordList) return null;

    // now that they're ordered, make columns of words
    const letters = orderedWords.map((array, letterCount) => {
        const words = array.map((word, wordCount) => (
            <Word
                finished={finished}
                word={word}
                key={`word-${wordCount}`}
                hidden={!model.isAlreadyGuessed(word)}
            />
        ));
        return (
            <div id={`letters-${letterCount}`} key={`div-1-${letterCount}`}>
                {words}
            </div>
        );
    });

    return <div id="completed">{letters}</div>;
};

export default Words;
