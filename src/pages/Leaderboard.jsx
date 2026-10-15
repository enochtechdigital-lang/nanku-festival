
import { Crown, Trophy } from 'lucide-react';
import queens from '../data/queens';
import './Leaderboard.css';

function Leaderboard() {
  const rankedQueens = [...queens].sort(
    (a, b) => (b.totalVotes ?? 0) - (a.totalVotes ?? 0)
  );

  return (
    <main className="leaderboard-page">
      <div className="leaderboard-container">
        <header className="leaderboard-heading">
          <span className="leaderboard-eyebrow">
            <Crown size={16} />
            NKANU CULTURAL HERITAGE FESTIVAL
          </span>

          <h1>
            The <span>Leaderboard</span>
          </h1>

          <p>
            Follow our Elegant Queens as they compete for the crown
            and celebrate our cultural heritage.
          </p>
        </header>

        <section className="leaderboard-panel">
          <div className="leaderboard-panel-heading">
            <Trophy size={22} />
            <div>
              <h2>Queen Rankings</h2>
              <p>Rankings are based on recorded vote totals.</p>
            </div>
          </div>

          {rankedQueens.length > 0 ? (
            <div className="leaderboard-list">
              {rankedQueens.map((queen, index) => (
                <article
                  className="leaderboard-row"
                  key={queen.id}
                >
                  <span className="leaderboard-rank">
                    {index + 1}
                  </span>

                  <img
                    className="leaderboard-queen-image"
                    src={
                      queen.culturalImage ||
                      '/images/nanku festival.jpg'
                    }
                    alt={queen.name}
                    loading="lazy"
                  />

                  <div className="leaderboard-queen-info">
                    <h3>{queen.name}</h3>
                    <p>{queen.town || 'Nanku'}</p>
                  </div>

                  <div className="leaderboard-votes">
                    <strong>
                      {(queen.totalVotes ?? 0).toLocaleString('en-NG')}
                    </strong>
                    <span>
                      {(queen.totalVotes ?? 0) === 1 ? 'vote' : 'votes'}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="leaderboard-empty">
              <Crown size={30} />
              <h3>No contestants yet</h3>
              <p>Approved contestants will appear here.</p>
            </div>
          )}
        </section>

        <p className="leaderboard-disclaimer">
          Vote totals currently use the website's local contestant data.
          They are not live verified payment records.
        </p>
      </div>
    </main>
  );
}

export default Leaderboard;
