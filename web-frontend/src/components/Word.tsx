import * as React from 'react';

type MyProps = {
    word: string,
    hidden: boolean,
    finished: boolean
}

class Word extends React.Component<MyProps, {}> {
    render() {
        const letters = this.props.word.split('').map((letter) => 
            <div className='letter_box'>
                <div style={{visibility: this.props.hidden && !this.props.finished ? 'hidden' : 'visible'}}>
                    {letter}
                </div>
            </div>
        );

        return (
            <li className={this.props.finished && this.props.hidden ? 'red' : ''} id={this.props.word}>{letters}</li>
        );
    }
};

export default Word;