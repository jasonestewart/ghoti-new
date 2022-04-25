import * as React from 'react';

type MyProps = {
    word: string,
    hidden: boolean
}

class Word extends React.Component<MyProps, {}> {
    render() {
        const letters = this.props.word.split('').map((letter) => 
            <div className='letter_box'>
                <div style={this.props.hidden ? {visibility: 'hidden'} : {}}>
                    {letter}
                </div>
            </div>
        );

        return (
            <li id={this.props.word}>{letters}</li>
        );
    }
};

export default Word;