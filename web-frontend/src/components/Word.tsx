type MyProps = {
    word: string;
    hidden: boolean;
    finished: boolean;
};

const Word = ({ word, hidden, finished }: MyProps) => {
    const letters = word.split("").map((letter) => (
        <div className="letter_box">
            <div
                style={{
                    visibility: hidden && !finished ? "hidden" : "visible",
                }}
            >
                {letter}
            </div>
        </div>
    ));

    return (
        <li className={finished && hidden ? "red" : ""} id={word}>
            {letters}
        </li>
    );
};

export default Word;
