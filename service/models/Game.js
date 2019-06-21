const EloRating = require('elo-rating');
import DAO from '../DataAccess/DAO';
const { playerKeyPrefix, gameLogPrefix } = require('./globals');


export class Game extends DAO {
  constructor(player1, player2, player1Points, player2Points) {
    this.player1 = player1;
    this.player1Points = player1Points;
    this.player2 = player2;
    this.player2Points = player2Points;
    this.winner = null;
    this.time = time;
  }

  calculateResults() {

  }

  save() {
    // write me
  }
}