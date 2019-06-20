import React from 'react';
import { Table, Button } from 'reactstrap';

const GameLog = ({ gameLogs, changeStateItem, isUserSpecific }) => (
  <React.Fragment>
    <section className="wrapper quarantined leaderboard flex-column">
      <Table>
        <thead className="thead-light">
          <tr>
            <th>Time</th>
            <th>Winner</th>
            <th>Loser</th>
            <th>Final Score</th>
          </tr>
        </thead>
        {gameLogs &&
          <tbody className="text-white">
            {buildLogRows(gameLogs)}
          </tbody>
        }
      </Table>
      {isUserSpecific &&
        <Button className="home-button" onClick={() => changeStateItem('diveDeepOnThisUser', null)}>Back</Button>
      }
    </section>
    {!gameLogs && <div className="text-center">No game data to display.</div>}
  </React.Fragment>
);

const logRow = (record) => (
  <tr key={record.time}>
    <td>{new Date(record.time * 1000).toUTCString().split('2019')[0]}</td>
    <td>{record.winner}</td>
    <td>{record.loser}</td>
    <td>{record.finalScore}</td>
  </tr>
)

const buildLogRows = (gameLogs) => {
  return gameLogs.map((record) => logRow(record));
}

export default GameLog;
