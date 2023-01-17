type MyProps = {
    letters: string[];
    prefix: string;
};

const Letters = ({ letters, prefix }: MyProps) => {
    return (
        <div id="word_container" className="grid grid-cols-7 gap-4 letter_container">
            <div
                id={`${prefix}.ltr_1`}
                key={`${prefix}.ltr_1`}
                className="letter col-span-1"
            >
                {letters[0]}
            </div>
            <div
                id={`${prefix}.ltr_2`}
                key={`${prefix}.ltr_2`}
                className="letter col-span-1"
            >
                {letters[1]}
            </div>
            <div
                id={`${prefix}.ltr_3`}
                key={`${prefix}.ltr_3`}
                className="letter col-span-1"
            >
                {letters[2]}
            </div>
            <div
                id={`${prefix}.ltr_4`}
                key={`${prefix}.ltr_4`}
                className="letter col-span-1"
            >
                {letters[3]}
            </div>
            <div
                id={`${prefix}.ltr_5`}
                key={`${prefix}.ltr_5`}
                className="letter col-span-1"
            >
                {letters[4]}
            </div>
            <div
                id={`${prefix}.ltr_6`}
                key={`${prefix}.ltr_6`}
                className="letter col-span-1"
            >
                {letters[5]}
            </div>
            <div
                id={`${prefix}.ltr_7`}
                key={`${prefix}.ltr_7`}
                className="letter col-span-1"
            >
                {letters[6]}
            </div>
        </div>
    );
};

export default Letters;
