import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { PlayerCard, SubmitResult } from '../../Custom';
import { AppStateContext } from '../../../contexts';
import { pongApi } from '../../../lib';

class Head2Head extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      player1: null,
      player2: null,
      showModal: false,
      image: null,
    };
  }

  async componentDidMount() {
    const playerList = await pongApi.listPlayers();
    if (playerList.length > 0) {
      this.setState({ users: playerList });
    }
  }

  selected = async (name, playerNumber) => {
    try {
      const selectedUser = await pongApi.getPlayer(name);
      this.setState({ [`player${playerNumber}`]: selectedUser });
      return;
    } catch (e) { 
      console.log('something went wrong', e);
    }
  }

  getUser = (user, playerNumber) => (
    <option
      key={`${user}${playerNumber}`}
      value={user}
    >
      {user}
    </option>
  )

  getInput = (playerNumber) => {
    const { users } = this.state;
    return (
      <select
        className="selection"
        onChange={(e) => this.selected(e.target.value, playerNumber)}
      >
        <option color="#41A9E9" className="option" value="">--Select a player--</option>
        {users.map((user) => this.getUser(user, playerNumber))}
      </select>
    )
  }

  placeholder = () => (
    <div className="player-1">
      <h2 className="title">---</h2>
      <div className="avatar" />
      <h3 className="name">---</h3>
      <h5 className="record">---</h5>
      <h5 className="record">---</h5>
    </div>
  )

  showModal = () => {
    const { player1, player2 } = this.state;

    if (!player1 || !player2) return;

    this.setState({ showModal: true });
  }

  hideModal = (reset = false) => {
    if (reset) {
      this.setState({ showModal: false, player1: null, player2: null });
      return;
    } else {
      this.setState({ showModal: false });
    }
  }

  render() {
    const { player1, player2, showModal } = this.state;

    return (
      <AppStateContext.Consumer>
        {(context) => (
          <React.Fragment>
            {showModal && <SubmitResult player1={player1} player2={player2} hideModal={this.hideModal} />}
            {!showModal &&
              <section className="quarantined">
                <h1 className="text-primary font-weight-bold">Head 2 Head</h1>
                <div className="control-wrapper head2head">
                  {player1 ? <PlayerCard player={player1} /> : this.placeholder()}
                  <div className="vs"><p>Versus</p></div>
                  {player2 ? <PlayerCard player={player2} /> : this.placeholder()}
                </div>
                <div className="d-flex justify-content-around m-3">
                  {this.getInput(1)}
                  {this.getInput(2)}
                </div>
                <Button onClick={this.showModal} className="home-button">Submit Result</Button>
              </section>
            }
          </React.Fragment>
        )}
      </AppStateContext.Consumer>
    );
  }
}

export default Head2Head;
