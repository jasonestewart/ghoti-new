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
  started: boolean
};

class App extends React.Component<{}, GhotiState> {
  model: GhotiModel;

  state = {
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
        <Ghoti model={this.model} />
      </div>
    );

  }
}
export default App;
