import React from 'react';
import { Button } from 'reactstrap';
import { AppStateContext } from '../../../contexts';

const HomeSection = (props) => {
  const { onPageSelected } = props;
  
  return (
    <AppStateContext.Consumer>
      {(context) => (
        <React.Fragment>
          <section className="quarantined">
            <h1><span className="text-primary font-weight-bold">PING</span> PONG</h1>
            <div className="control-wrapper">
              <Button className="home-button" onClick={() => { onPageSelected('head2head')}}>Head 2 Head</Button>
              <Button className="home-button" onClick={() => { onPageSelected('addPlayer')}}>Add Player</Button>
              <Button className="home-button" onClick={() => { onPageSelected('leaderboard') }}>Leaderboard</Button>
              <Button className="home-button" onClick={() => { onPageSelected('gameLog')}}>Game Log</Button>
            </div>
          </section>
        </React.Fragment>
      )}
    </AppStateContext.Consumer>
  );
}

export default HomeSection;
