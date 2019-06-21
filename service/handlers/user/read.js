const getPlayer = async (req) => {
  const { player } = req.params;

  if (!player) return new MISSING_PARAMETERS_ERROR();

  try {
    return this.db.get(`${playerKeyPrefix}${player}`);
  } catch (e) {
    return { message: 'could not retrieve user' };
  }
}

const getPlayers = async (req) => {
  try {
    return this.db.list(playerKeyPrefix);
  } catch (e) {
    return { message: 'could not retrieve user list' };
  }
}