import React, { useEffect, useState } from "react";
import GhotiModel from "../model/GhotiModel";
import Word from "./Word";

type MyProps = {
    wordList: string[];
    finished: boolean;
    model: GhotiModel;
};

const Words = ({ wordList, model, finished }: MyProps) => {
    const [orderedWords, setOrderedWords] = useState<string[][]>([]);

    useEffect(() => {
        let ow: string[][] = [];
        for (let i = 3; i <= 7; i++) {
            ow[i] = [];
        }

        wordList.forEach((word) => {
            ow[word.length].push(word.toUpperCase());
        });
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
            <div
                id={`letters-${letterCount}`}
                key={`-${letterCount}`}
                className="flex flex-wrap flex-col"
            >
                {words}
            </div>
        );
    });

    return <div className="flex flex-row gap-4">{letters}</div>;
};

export default Words;
