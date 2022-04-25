import * as React from 'react';
import Header from './components/Header';
import './App.css';

import GhotiModel from './model/GhotiModel';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Ghoti from './components/Ghoti';

type GhotiState = {
  lastKeyPressed: string,
  word: string,
  paused: boolean,
  started: boolean
};

class App extends React.Component<{}, GhotiState> {
  model: GhotiModel;
  GAME_TIME = 120;
  EMPTY = "";
  EMPTY_WORD = this.EMPTY.repeat(7);

  state = {
    lastKeyPressed: '',
    word: this.EMPTY_WORD,
    paused: false,
    started: false
  };

  constructor() {
    super({});
    this.model = new GhotiModel();
  }
  
  render() {
    return (
      <div id="home_wrap">
        <Header />
          <button onClick={this.start}>{this.state.started ? "Stop" : "Start"}</button>
        <Ghoti started={this.state.started} callback={this.start} model={this.model} />
      </div>
    );

  }

  start = async () => {
    if (this.state.started) {
      this.setState({
        started: false
      });
    } else {
      await this.model.fetchNewWord(); 
      this.setState({
        started: true,
        word: this.model.getCurrentWord()
      });
    }
  };

}

export default App;
