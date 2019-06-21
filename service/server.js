const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const recordGame = require('./handlers/game/create');
const listGames = require('./handlers/game/read');

const createUser = require('./handlers/user/create');
const listUsers = require('./handlers/user/create');

const getLeaderboard = require('./handlers/leaderboard/read');
const refreshSystem = require('./handlers/system/update');

const port = process.env.PORT || 3000; // 4000 for local.
const app = express();

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ['OPTIONS', 'GET', 'PUT', 'POST']
}));

const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)
    
app.get('/ping', asyncHandler(async (req, res, next) => res.status(200).send(`pong`)));

// Combine these two into 1
app.get('/player', asyncHandler(async (req, res, next) => res.send(await listUsers(req))));
app.get('/player/:player', asyncHandler(async (req, res, next) => res.send(await listUsers(req))));
app.post('/player', asyncHandler(async (req, res, next) => res.send(await createUser(req))));

app.get('/leaderboard', asyncHandler(async (req, res, next) => res.send(await getLeaderboard(req))));

app.get('/game', asyncHandler(async (req, res, next) => res.send(await listGames(req))));
app.post('/game', asyncHandler(async (req, res, next) => res.send(await recordGame(req))));

app.put('/refresh', asyncHandler(async (req, res, next) => res.send(await refreshSystem(req))));

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendStatus(500).send({ 'message': 'Internal Server Error' })
  next()
})

const server = app.listen(port, () => { console.log(`Server listening on port ${port}`); })
server.timeout = 1000000;
server.keepAliveTimeout = 90000;
