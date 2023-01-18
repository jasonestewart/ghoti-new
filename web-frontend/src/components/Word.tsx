type MyProps = {
    word: string;
    hidden: boolean;
    finished: boolean;
};
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Word = ({ word, hidden, finished }: MyProps) => {
    const wordLength = word.length;
    const visibility =
        finished && hidden ? "red" : hidden ? "hidden" : "visible";
    const gridCols =
        wordLength === 3
            ? "grid-cols-3"
            : wordLength === 4
            ? "grid-cols-4"
            : wordLength === 5
            ? "grid-cols-5"
            : wordLength === 6
            ? "grid-cols-6"
            : "grid-cols-7";
    return (
        <div className={classNames("grid", gridCols)} id={word}>
            {word.split("").map((letter, i) => (
                <div key={`${letter}-${i}`} className="letter_box">
                    <div className={visibility}>{letter}</div>
                </div>
            ))}
        </div>
    );
};

export default Word;
