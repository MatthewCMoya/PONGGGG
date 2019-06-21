const Game = require('../../models/Game');
const User = require('../../models/User');
const { MISSING_PARAMETERS_ERROR } = require('../../lib/CustomErrors');

const postResult = async (req) => {
  const { p1, p1Score, p2, p2Score } = validateReq(req.body);
  const time = Math.round(new Date().getTime() / 1000);
  const didPlayer1Win = Number(player1Score) > Number(player2Score);

  const player1 = User.getByNameOrFail(p1);
  const player2 = User.getByNameOrFail(p2);

  const {
    p1Rating,
    p2Rating,
  } = Game.calculateResult(player1, player2, didPlayer1Win);
  
  player1.adjustRecord(didPlayer1Win, p1Rating);
  player1.save();

  player2.adjustRecord(!didPlayer1Win, p2Rating);
  player2.save();

  const game = new Game(p1, p1Score, p2, p2Score, time);
  game.save();
  
  return game;
}

function validateReq(body) {
  const { p1, p1Score, p2, p2Score } = body || {};

  if (!p1 || !p2 || !p1Score || !p2Score) {
    throw new MISSING_PARAMETERS_ERROR();
  }

  if (p1Score === p2Score) {
    throw Error('No Ties')
  }

  return { p1, p1Score, p2, p2Score };
}

export default postResult;
