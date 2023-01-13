type MyProps = {
    letters: string[];
};

const Letters = ({ letters }: MyProps) => {
    return (
        <div>
            <ul id="word_container" className="letter_container">
                <li id="ltr_1" className="letter">
                    {letters[0]}
                </li>
                <li id="ltr_2" className="letter">
                    {letters[1]}
                </li>
                <li id="ltr_3" className="letter">
                    {letters[2]}
                </li>
                <li id="ltr_4" className="letter">
                    {letters[3]}
                </li>
                <li id="ltr_5" className="letter">
                    {letters[4]}
                </li>
                <li id="ltr_6" className="letter">
                    {letters[5]}
                </li>
                <li id="ltr_7" className="letter">
                    {letters[6]}
                </li>
            </ul>
        </div>
    );
};

export default Letters;
