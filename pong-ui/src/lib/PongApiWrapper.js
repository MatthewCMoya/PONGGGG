import PongApi from './PongApi';

export default class PongApiWrapper {
  constructor() {
    this.pongApi = new PongApi();
    this.changeAppState = () => {};
  }

  setChangeAppState = (changeAppState) => {
    this.changeAppState = changeAppState;
  }

  addPlayer = async (newPlayer) => {
    return this.pongApi.post('/add-player', newPlayer)
  }

  listPlayers = async () => {
    return this.pongApi.get('/players');
  }

  getPlayer = async (name) => {
    return this.pongApi.get(`/player/${name}`)
  }

  submitGameResult = async (body) => {
    return this.pongApi.post('/result', body)
  }

  getLeaderboard = async () => {
    const leaderboard = await this.pongApi.get('/leaderboard');
    if (leaderboard.length > 0) {
      const sorted = leaderboard.sort((uno, dos) => dos.rating - uno.rating);
      this.changeAppState('leaderboard', sorted);
    }

    return;
  }

  getGameLogs = async () => {
    const gameLogs = await this.pongApi.get('/game-log');

    if (gameLogs.length > 0) {
      const sorted = gameLogs.sort((uno, dos) => dos.time - uno.time);
      this.changeAppState('gameLogs', sorted);
    }

    return;
  }

  refreshService = async () => this.pongApi.put('/refresh', {})
}
