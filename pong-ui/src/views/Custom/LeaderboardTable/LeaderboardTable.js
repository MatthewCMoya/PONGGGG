import React from 'react';
import { Table } from 'reactstrap';

const LeaderboardTable = (props) => (
  <React.Fragment>
    <section className="wrapper quarantined leaderboard">
        <Table>
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Record</th>
              <th>rating</th>
              <th>Games Played</th>
            </tr>
        </thead>
        {props.leaderboard && 
          <tbody className="text-white">
            {props.leaderboard.map((user) => leaderboardRow(user, props.changeStateItem))}
          </tbody>
        }
      </Table>
    </section>
    {!props.leaderboard && <div className="text-center">No game data to display.</div>}
  </React.Fragment>
)

export default LeaderboardTable;


const leaderboardRow = (user, changeStateItem) => {
  const { name, record, rating } = user;

  return (
    <tr
      className="leaderboard-row"
      onClick={() => { changeStateItem('diveDeepOnThisUser', name) }}
      key={name}
    >
      <td>{name}</td>
      <td>{record.wins} - {record.losses}</td>
      <td>{rating}</td>
      <td>{record.wins + record.losses}</td>
    </tr>
  )
}
