const EloRating = require('elo-rating');
const DAO = require('../DataAccess/DAO');
// const { playerKeyPrefix, gameLogPrefix } = require('./globals');

export class Game extends DAO {
  static calculateResult(player1, player2, didPlayer1Win) {
    const arg1 = didPlayer1Win ? player1.rating : player2.rating;
    const arg2 = didPlayer1Win ? player2.rating : player1.rating;
    const { playerRating, opponentRating } = EloRating.calculate(arg1, arg2, true);

    return {
      p1Rating: didPlayer1Win ? playerRating : opponentRating,
      p2Rating: didPlayer1Win ? opponentRating : playerRating,
    }
  }

  constructor(player1, player1Points, player2, player2Points, time) {
    this.player1 = player1;
    this.player1Points = player1Points;
    this.player2 = player2;
    this.player2Points = player2Points;
    this.time = time;
  }

  save() {
    // write me
  }
}