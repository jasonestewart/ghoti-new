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
    const visibility = finished && hidden ? "red" : "";
    return (
        <div
            className={`${visibility} grid grid-cols-${wordLength} gap-1`}
            style={{
                gridTemplateColumns: `repeat(${wordLength}, minmax(0,1fr))`,
            }}
            id={word}
        >
            {word.split("").map((letter, i) => (
                <div key={`${letter}-${i}`} className="">
                    {letter}
                </div>
            ))}
        </div>
    );
};

export default Word;
