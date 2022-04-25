import * as React from 'react';
// import { Container } from '@mui/material';

type MyProps = {
    score: number,
    percent: number,
    round: number
}

type MyState = {
}
class Score extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="game_info">
                <div id="score">
                    <span className="label">Score: </span>
                    <span className="value">{this.props.score}</span>
                </div>
                <div id="percent">
                    <span className="label">Percent: </span>
                    <span className="value">{this.props.percent}%</span>
                </div>
                <div id="roundNum">
                    <span className="label">Round: </span>
                    <span className="value">{this.props.round}</span>
                </div>

            </div>
        );
    }
}  

export default Score;
