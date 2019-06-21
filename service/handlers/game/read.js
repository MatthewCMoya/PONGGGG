const getGameLog = async (req) => {
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

export default getGameLog;
