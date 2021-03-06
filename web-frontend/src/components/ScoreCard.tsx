import Letters from './Letters';
import Score from './Score';
import * as React from 'react';
import GhotiModel from '../model/GhotiModel';

type MyProps = {
    model: GhotiModel
}

// type MyState = {
// }

class ScoreCard extends React.Component<MyProps, {}> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="type_area">
                <Score score={this.props.model.getScore()} 
                    percent={Math.floor(this.props.model.getPercent() * 100)} 
                    round={this.props.model.getRound()}/>
                <Letters letters={this.props.model.getAvailableLetters()} />
                <Letters letters={this.props.model.getGuessedLetters()}/>
            </div>
        );

    }
}

export default ScoreCard;