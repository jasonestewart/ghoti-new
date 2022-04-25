import * as React from 'react';

type MyProps = {
    letters: string[]
}

class Letters extends React.Component<MyProps, {}> {
    render() {
        return (
            <div>
                <ul id="word_container" className="letter_container">
                    <li id="ltr_1" className="letter">{this.props.letters[0]}</li>
                    <li id="ltr_2" className="letter">{this.props.letters[1]}</li>
                    <li id="ltr_3" className="letter">{this.props.letters[2]}</li>
                    <li id="ltr_4" className="letter">{this.props.letters[3]}</li>
                    <li id="ltr_5" className="letter">{this.props.letters[4]}</li>
                    <li id="ltr_6" className="letter">{this.props.letters[5]}</li>
                    <li id="ltr_7" className="letter">{this.props.letters[6]}</li>
                </ul>
            </div>
        );
    }
};

export default Letters;