import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './App.css';
import './scss/style.css';
import { DefaultLayout } from './containers';
import { pongApi } from './lib';
import { AppStateContext } from './contexts';

const defaultState = {
  leaderboard: null,
  gameLogs: null,
  setChangeAppState: false,
}

class App extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  componentWillMount() {
    if (!this.state.setChangeAppStates) {
      pongApi.setChangeAppState(this.changeAppState);
      this.setState({ setChangeAppState: true });
    }
  }

  changeAppState = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  resetAppState = () => {
    this.setState(defaultState)
  }

  render() {
    const { state, changeAppState } = this;

    return (
      <AppStateContext.Provider value={{ appState: state, changeAppState }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" name="Pong" component={DefaultLayout} />
          </Switch>
        </BrowserRouter>
      </AppStateContext.Provider>
    );
  }
}

export default App;
