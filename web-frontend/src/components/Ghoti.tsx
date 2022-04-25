import * as React from 'react';
import StartInfo from './StartInfo';
import Game from './Game';
import GhotiModel from '../model/GhotiModel';

type MyProps = {
    model: GhotiModel
}

type MyState = {
  started: boolean
}

class Ghoti extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {started: false};
  }

  render() {
    if (!this.state.started) {
        return(
            <StartInfo callback={this.start}/>
        );
    }


    return (
        <Game model={this.props.model} />
    );

  }


  start = async () => {
    await this.props.model.restart();

    this.setState({
      started: true,
    });
  };

}

export default Ghoti;