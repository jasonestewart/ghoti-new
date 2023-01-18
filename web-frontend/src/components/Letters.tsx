type MyProps = {
    letters: string[];
    prefix: string;
};

const Letters = ({ letters, prefix }: MyProps) => {
    return (
        <div
            id="word_container"
            className="grid grid-cols-7 gap-4 letter_container"
        >
            <div key={`${prefix}.ltr_1`} className="letter col-span-1">
                <div className="">{letters[0]}</div>
            </div>
            <div key={`${prefix}.ltr_2`} className="letter col-span-1">
                <div className="">{letters[1]}</div>
            </div>
            <div key={`${prefix}.ltr_3`} className="letter col-span-1">
                <div className="">{letters[2]}</div>
            </div>
            <div key={`${prefix}.ltr_4`} className="letter col-span-1">
                <div className="">{letters[3]}</div>
            </div>
            <div key={`${prefix}.ltr_5`} className="letter col-span-1">
                <div className="">{letters[4]}</div>
            </div>
            <div key={`${prefix}.ltr_6`} className="letter col-span-1">
                <div className="">{letters[5]}</div>
            </div>
            <div key={`${prefix}.ltr_7`} className="letter col-span-1">
                <div className="">{letters[6]}</div>
            </div>
        </div>
    );
};

export default Letters;
