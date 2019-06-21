const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000; // 4000 for local.
const app = express();
const actions = new Actions();

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

app.get('/player', asyncHandler(async (req, res, next) => res.send(await actions.getPlayers(req))));
app.get('/player/:player', asyncHandler(async (req, res, next) => res.send(await actions.getPlayer(req))));
app.post('/player', asyncHandler(async (req, res, next) => res.send(await actions.addPlayer(req))));
app.get('/leaderboard', asyncHandler(async (req, res, next) => res.send(await actions.getLeaderboard(req))));
app.get('/game', asyncHandler(async (req, res, next) => res.send(await actions.getGameLog(req))));
app.post('/game', asyncHandler(async (req, res, next) => res.send(await actions.postResult(req))));
app.put('/refresh', asyncHandler(async (req, res, next) => res.send(await actions.refreshService(req))));

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendStatus(500).send({ 'message': 'Internal Server Error' })
  next()
})

const server = app.listen(port, () => { console.log(`Server listening on port ${port}`); })
server.timeout = 1000000;
server.keepAliveTimeout = 90000;
