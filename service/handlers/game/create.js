const EloRating = require('elo-rating');
const Database = require('./Database');
const { MALFORMED_JSON_ERROR, MISSING_PARAMETERS_ERROR } = require('./CustomErrors');
const { playerKeyPrefix, gameLogPrefix } = require('./globals');

const db = new Database();

const postResult = async (req) => {
  if (Object.keys(req.body).length === 0) { throw new MALFORMED_JSON_ERROR(); }
  
  const { player1, player1Score, player2, player2Score } = req.body;
  
  if (!player1 || !player1Score || !player2 || !player2Score) { throw new MISSING_PARAMETERS_ERROR(); }
  if (player1Score === player2Score) { throw Error('No Ties')}
  
  try {
    const player1Object = await db.get(`${playerKeyPrefix}${player1}`);
    const player2Object = await db.get(`${playerKeyPrefix}${player2}`);
    const didPlayer1Win = Number(player1Score) > Number(player2Score);
    
    const arg1 = didPlayer1Win ? player1Object.rating : player2Object.rating;
    const arg2 = didPlayer1Win ? player2Object.rating : player1Object.rating;
    const { playerRating, opponentRating } = EloRating.calculate(arg1, arg2, true);
    
    player1Object.record[didPlayer1Win ? 'wins' : 'losses'] += 1
    player1Object.rating = didPlayer1Win ? playerRating : opponentRating;

    player2Object.record[didPlayer1Win ? 'losses' : 'wins'] += 1
    player2Object.rating = didPlayer1Win ? opponentRating : playerRating;

    await db.save(playerKeyPrefix, player1, player1Object);
    await db.save(playerKeyPrefix, player2, player2Object);

    const time = Math.round(new Date().getTime() / 1000);

    const gameLog = {
      winner: didPlayer1Win ? player1 : player2,
      loser: didPlayer1Win ? player2 : player1,
      finalScore: `${player1Score}-${player2Score}`,
      time,
    }

    await db.save(gameLogPrefix, time, gameLog);

    return { message: 'success' };
  } catch (e) {
    return { message: 'something went wrong' };
  }
}

export default postResult;
