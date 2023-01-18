import { useMemo } from "react";
import Word from "./Word";

type MyProps = {
    wordList: string[];
    guessedWordList: string[];
    finished: boolean;
};

const Words = ({ wordList, guessedWordList, finished }: MyProps) => {
    const orderedWords = useMemo(() => {
        let ow: string[][] = [];
        for (let i = 3; i <= 7; i++) {
            ow[i] = [];
        }

        wordList.forEach((word) => {
            ow[word.length].push(word.toUpperCase());
        });
        return ow;
    }, [wordList]);

    // now that they're ordered, make columns of words
    return (
        <div className="flex flex-row gap-4">
            {orderedWords.map((array, letterCount) => (
                <div
                    id={`letters-${letterCount}`}
                    key={`-${letterCount}`}
                    className="flex flex-wrap flex-col"
                >
                    {array.map((word, wordCount) => (
                        <Word
                            finished={finished}
                            word={word}
                            key={`word-${wordCount}`}
                            hidden={guessedWordList.indexOf(word) === -1}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Words;
