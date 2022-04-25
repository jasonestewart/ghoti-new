import * as React from 'react';
import StartInfo from './StartInfo';
import Game from './Game';
import GhotiModel from '../model/GhotiModel';

type MyProps = {
    started: boolean,
    callback: () => void,
    model: GhotiModel
}

type MyState = {
}

class Ghoti extends React.Component<MyProps, MyState> {
  render() {
    if (!this.props.started) {
        return(
            <StartInfo callback={this.props.callback}/>
        );
    }


    return (
        <Game model={this.props.model} />
    );

  }
}
export default Ghoti;