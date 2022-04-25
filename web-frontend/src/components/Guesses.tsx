import * as React from 'react';

type MyProps = {
    guesses: string[]
}

class Guesses extends React.Component<MyProps, {}> {
    render() {
        return (
            <div>
                <ul id="letter_container" className="letter_container">
                    <li id="ltr_1" className="letter">{this.props.guesses[0]}</li>
                    <li id="ltr_2" className="letter">{this.props.guesses[1]}</li>
                    <li id="ltr_3" className="letter">{this.props.guesses[2]}</li>
                    <li id="ltr_4" className="letter">{this.props.guesses[3]}</li>
                    <li id="ltr_5" className="letter">{this.props.guesses[4]}</li>
                    <li id="ltr_6" className="letter">{this.props.guesses[5]}</li>
                    <li id="ltr_7" className="letter">{this.props.guesses[6]}</li>
                </ul>
            </div>
        );
    }
};

export default Guesses;