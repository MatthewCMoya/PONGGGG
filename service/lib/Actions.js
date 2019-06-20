const EloRating = require('elo-rating');
const Database = require('./Database');
const { MALFORMED_JSON_ERROR, MISSING_PARAMETERS_ERROR } = require('./CustomErrors');
const { playerKeyPrefix, gameLogPrefix, imagePrefix } = require('./globals');

class Actions {
  constructor() {
    this.db = new Database();
  }

  async addPlayer(req) {
    const { body } = req;
    if (Object.keys(body).length === 0) { throw new MALFORMED_JSON_ERROR(); }

    const key = `${body.name}`;

    try {
      await this.db.get(`${playerKeyPrefix}${key}`);

      return { message: 'User already exists' };
    } catch (e) {
      console.log('creating new user', body.name);
    }

    try {
      if (body.image) {
        const imageKey = `${imagePrefix}${body.avatar}`;
        await this.db.saveImage(imageKey, body.image)
      }

      const newUser = {
        ...body,
        record: { "wins": 0, "losses": 0 },
        rating: 0,
      }

      delete newUser.image;
      await this.db.save(playerKeyPrefix, key, newUser);
      
      return { message: 'Success' };
    } catch (e) {
      return { message: 'some error. the put failed' }
    }
  }

  async postResult(req) {
    if (Object.keys(req.body).length === 0) { throw new MALFORMED_JSON_ERROR(); }
    
    const { player1, player1Score, player2, player2Score } = req.body;
    
    if (!player1 || !player1Score || !player2 || !player2Score) { throw new MISSING_PARAMETERS_ERROR(); }
    if (player1Score === player2Score) { throw Error('No Ties')}
    
    try {
      const player1Object = await this.db.get(`${playerKeyPrefix}${player1}`);
      const player2Object = await this.db.get(`${playerKeyPrefix}${player2}`);
      const didPlayer1Win = Number(player1Score) > Number(player2Score);
      
      const arg1 = didPlayer1Win ? player1Object.rating : player2Object.rating;
      const arg2 = didPlayer1Win ? player2Object.rating : player1Object.rating;
      const { playerRating, opponentRating } = EloRating.calculate(arg1, arg2, true);
      
      player1Object.record[didPlayer1Win ? 'wins' : 'losses'] += 1
      player1Object.rating = didPlayer1Win ? playerRating : opponentRating;

      player2Object.record[didPlayer1Win ? 'losses' : 'wins'] += 1
      player2Object.rating = didPlayer1Win ? opponentRating : playerRating;

      await this.db.save(playerKeyPrefix, player1, player1Object);
      await this.db.save(playerKeyPrefix, player2, player2Object);

      const time = Math.round(new Date().getTime() / 1000);

      const gameLog = {
        winner: didPlayer1Win ? player1 : player2,
        loser: didPlayer1Win ? player2 : player1,
        finalScore: `${player1Score}-${player2Score}`,
        time,
      }

      await this.db.save(gameLogPrefix, time, gameLog);

      return { message: 'success' };
    } catch (e) {
      return { message: 'something went wrong' };
    }
  }

  async getLeaderboard(req) {
    try {
      const players = await this.getPlayers(req);
      const users = players.map(async (key) => await this.db.get(`${playerKeyPrefix}${key}`));

      return await Promise.all(users);
    } catch (e) {
      return { message: 'error in listing users' };
    }
  }

  async getGameLog(req) {
    try {
      const keys = await this.db.list(gameLogPrefix);

      const logs = keys.map(async (key) => {
        return await this.db.get(`${gameLogPrefix}${key}`); 
      });

      return await Promise.all(logs);
    } catch (e) {
      return { message: 'error in listing logs' };
    }
  }

  async getPlayer(req) {
    const { player } = req.params;

    if (!player) return new MISSING_PARAMETERS_ERROR();

    try {
      return this.db.get(`${playerKeyPrefix}${player}`);
    } catch (e) {
      return { message: 'could not retrieve user' };
    }
  }

  async getPlayers(req) {
    try {
      return this.db.list(playerKeyPrefix);
    } catch (e) {
      return { message: 'could not retrieve user list' };
    }
  }

  async refreshService(req) {
    return this.db.refresh();
  }
}

module.exports = Actions;
