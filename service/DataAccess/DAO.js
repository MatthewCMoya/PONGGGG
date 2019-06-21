const redis = require('redis');
const { promisify } = require('util');
const S3Client = require('../lib/S3Client');
const { gameLogPrefix, playerKeyPrefix, expirationDurationInDays } = require('../lib/globals');

export class DAO {
  constructor(injected={}) {
    this.s3Client = injected.s3 || new S3Client();
    this.redisClient = injected.redis || new redis.createClient();
    if (!injected.redis) this.promisifyRedis(this.redisClient);
  }

  promisifyRedis(redisClient) {
    this.rediskeys = promisify(redisClient.keys).bind(redisClient);
    this.redisget = promisify(redisClient.get).bind(redisClient);
    this.redisset = promisify(redisClient.set).bind(redisClient);
    this.redisflush = promisify(redisClient.flushdb).bind(redisClient);
  }

  async get(key) {
    const result = await this.redisget(key);

    if (result) {
      return JSON.parse(result);
    }

    try {
      const item = await this.s3Client.get(key);
      await this.addToCache(key, item);

      return item;
    } catch (e) {
      throw Error({ message: 'Key not found' });
    }
  };

  async list(prefix) {
    const keys = await this.rediskeys(`${prefix}*`);
    if (keys.length !== 0) return keys.map((key) => key.split(prefix)[1]).sort();

    const itemList = await this.s3Client.list(prefix);

    if (itemList.length === 0) console.log(`${prefix} not in s3`);

    return itemList.sort();
  };

  async save(prefix, key, data) {
    const doesExpire = prefix === gameLogPrefix ? this.getExpireeTime(key) : null;

    try {
      await this.s3Client.put(`${prefix}${key}`, data, doesExpire);
      await this.addToCache(`${prefix}${key}`, data, !!doesExpire);
      return;
    } catch (e) {
      console.log('[SAVE_ERROR]', e);
    }
  };

  async saveImage(key, image) {
    return this.s3Client.putImage(key, image);
  }

  getExpireeTime(time) {
    return Math.round((Number(time) + this.getExpireeSeconds()));
  }

  getExpireeSeconds() {
    return Number(86400 * expirationDurationInDays);
  }

  async addToCache(key, data, expireAt=null) {
    if (expireAt) {
      return await this.redisset(key, JSON.stringify(data), 'EX', this.getExpireeSeconds())
    } else {
      return await this.redisset(key, JSON.stringify(data));
    }
  }

  async refresh() {
    try {
      await this.redisflush();
      const playerList = await this.s3Client.list(playerKeyPrefix);
      const players = playerList.map(async (player) => {
        const playerData = await this.s3Client.get(`${playerKeyPrefix}${player}`);
        await this.addToCache(`${playerKeyPrefix}${player}`, playerData);
      });
      const gameLogList = await this.s3Client.list(gameLogPrefix);

      if (gameLogList.length < 1) {
        await Promise.all(players);

        return { message: 'success' }
      }

      const gameLogs = gameLogList.map(async (gameLog) => {
        const logData = await this.s3Client.get(`${gameLogPrefix}${gameLog}`);
        await this.addToCache(`${gameLogPrefix}${gameLog}`, logData, true);
      });

      await Promise.all([players, gameLogs]);

      return { message: 'success' };
    } catch (e) {
      return Error(`Unable to refresh cache. Error: ${e}`)
    }
  }
}
