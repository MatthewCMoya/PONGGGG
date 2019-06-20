import React, { Component } from 'react';

import {
  Head2Head,
  HomeSection,
  Leaderboard,
  GameLog,
  AddPlayer,
} from '../../Custom';
import { AppStateContext } from '../../../contexts';
import { pongApi } from '../../../lib';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      page: 'home',
    };
  }

  async componentDidMount() {
    console.log('mounting. calling.')
    await pongApi.getLeaderboard();
    await pongApi.getGameLogs();
  }
  
  onPageSelected = (value) => {
    this.setState({ page: value })
  }

  onRefreshClicked = async () => {
    try {
      const result = await pongApi.refreshService();
      this.setState({ success: result.message });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { page, success } = this.state;
    const { showRefreshButton } = this.props;

    return (
      <AppStateContext.Consumer>
        {(context) => (
          <React.Fragment>
            <section className="wrapper">
              {/* <img onClick={() => { this.onPageSelected('home')}} alt="banana" src={'../doesnt exist'} className="" /> */}
              <div className="row title">
                <h1>
                  <span role="img" aria-label="tudah">🍸</span>
                  <span role="img" aria-label="tudah">🏓</span>
                  <span role="img" aria-label="tudah">🍻</span>
                </h1>
              </div>
            </section>
            {page === 'home' && <HomeSection onPageSelected={this.onPageSelected} />}
            {page === 'head2head' && <Head2Head />}
            {page === 'leaderboard' && <Leaderboard leaderboard={context.appState.leaderboard} gameLogs={context.appState.gameLogs} />}
            {page === 'addPlayer' && <AddPlayer onPageSelected={this.onPageSelected} />}
            {page === 'gameLog' && <GameLog gameLogs={context.appState.gameLogs} />}
            {showRefreshButton && <button className="refresh-cache" onClick={this.onRefreshClicked}>{success ? 'BOOOM' : 'Refresh Cache'}</button>}
          </React.Fragment>
        )}
      </AppStateContext.Consumer>
    );
  }
}

export default HomePage;
