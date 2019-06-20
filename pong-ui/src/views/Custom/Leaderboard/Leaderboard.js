import React, { Component } from 'react';
import { AppStateContext } from '../../../contexts';
import { LeaderboardTable, GameLog } from '../../Custom';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      diveDeepOnThisUser: null,
      gameLogsForUser: null,
    };
  }

  changeStateItem = async (item, value) => {
    const newState = { [item]: value };
    console.log(value)

    if (item === 'diveDeepOnThisUser') {
      const { gameLogs } = this.props;

      newState.gameLogsForUser = gameLogs.filter((log) => (log.winner === value || log.loser === value));
    }
    
    this.setState(newState);
  }

  render() {
    const { diveDeepOnThisUser, gameLogsForUser } = this.state;
    const { leaderboard } = this.props;
 
    return (
      <AppStateContext.Consumer>
        {(context) => (
          <React.Fragment>
            {!diveDeepOnThisUser && <LeaderboardTable leaderboard={leaderboard} changeStateItem={this.changeStateItem} />}
            {diveDeepOnThisUser && <GameLog isUserSpecific={true} gameLogs={gameLogsForUser} changeStateItem={this.changeStateItem} />}
          </React.Fragment>
        )}
      </AppStateContext.Consumer>
    );
  }
}

export default Leaderboard;
