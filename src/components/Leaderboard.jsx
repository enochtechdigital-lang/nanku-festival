
import { Crown, Medal, Trophy } from 'lucide-react';
import queens from '../data/queens';
import './Leaderboard.css';

function Leaderboard() {
  const topQueens = [...queens]
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 5);

  const rankIcons = [
    <Trophy key="first" size={21} />,
    <Medal key="second" size={21} />,
    <Medal key="third" size={21} />,
  ];

  return (
    <section className="leaderboard-section section" id="leaderboard">
      <div className="container">

        <div className="leaderboard-heading">
          <span className="leaderboard-eyebrow">
            <Crown size={15} />
            THE ROAD TO THE CROWN
          </span>

          <h2>Current <span>Standings</span></h2>

          <p>
            Celebrating the Elegant Queens representing our heritage.
          </p>
        </div>

        <div className="leaderboard-list">
          {topQueens.map((queen, index) => (
            <article className="leaderboard-row" key={queen.id}>

              <div className={`leaderboard-rank rank-${index + 1}`}>
                {rankIcons[index] || `0${index + 1}`}
              </div>

              <img
                className="leaderboard-avatar"
                src={queen.culturalImage}
                alt={queen.name}
                loading="lazy"
              />

              <div className="leaderboard-queen-info">
                <span className="leaderboard-code">
                  ELEGANT QUEEN {String(index + 1).padStart(3, '0')}
                </span>
                <h3>{queen.name}</h3>
                <span className="leaderboard-town">{queen.town}</span>
              </div>

              <div className="leaderboard-votes">
                <strong>{queen.totalVotes.toLocaleString()}</strong>
                <span>Votes</span>
              </div>

            </article>
          ))}
        </div>

        <p className="leaderboard-note">
          Official standings are subject to verified vote approval.
        </p>

      </div>
    </section>
  );
}

export default Leaderboard;
