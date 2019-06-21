const leaderboard = async (req) => {
  try {
    const players = await this.getPlayers(req);
    const users = players.map(async (key) => await this.db.get(`${playerKeyPrefix}${key}`));

    return await Promise.all(users);
  } catch (e) {
    return { message: 'error in listing users' };
  }
}
