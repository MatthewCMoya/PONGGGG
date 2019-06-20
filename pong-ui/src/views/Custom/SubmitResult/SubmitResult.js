import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { AppStateContext } from '../../../contexts';
import { pongApi } from '../../../lib';

class SubmitResult extends Component {
  constructor() {
    super();
    this.state = {
      player1Score: null,
      player2Score: null,
    };
  }

  updateScore = (property, e) => {
    this.setState({ [property]: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    
    const { player1Score, player2Score } = this.state;
    const {
      player1: { name: player1 },
      player2: { name: player2 },
      hideModal,
    } = this.props;

    const payload = {
      player1,
      player1Score,
      player2,
      player2Score,
    }

    try {
      await pongApi.submitGameResult(payload)
      hideModal(true); // add a force refresh for updating score
    } catch (e) {
      console.log('something went wrong', e);
    }
  }

  render() {
    const { player1, player2, hideModal } = this.props;
    return (
      <AppStateContext.Consumer>
        {(context) => (
          <form onSubmit={this.onSubmit} className="quarantined fade-in">
            <h1 className="text-primary font-weight-bold">Enter Scores</h1>
            <div className="control-wrapper">
              <div className="w-50">
                <h2 className="title">{player1.name}</h2>
                <input
                  type="number"
                  placeholder="Enter final score"
                  onChange={(e) => { this.updateScore('player1Score', e) }}
                  className="name"
                  required
                />
              </div>
              <div className="w-50">
                <h2 className="title">{player2.name}</h2>
                <input
                  type="number"
                  placeholder="Enter final score"
                  onChange={(e) => { this.updateScore('player2Score', e) }}
                  className="name"
                  required
                />
              </div>
            </div>
            <div className="button-wrapper">
              <Button type="submit" className="home-button">Submit Result</Button>
              <Button onClick={hideModal} className="home-button">Back</Button>
            </div>
          </form>
        )}
      </AppStateContext.Consumer>
    );
  }
}

export default SubmitResult;
