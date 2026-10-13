import { ArrowRight, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import queens from '../data/queens';
import QueenCard from './QueenCard';
import './QueensSection.css';

function QueensSection() {
  const sortedQueens = [...queens].sort(
    (a, b) => b.totalVotes - a.totalVotes
  );

  return (
    <section className="queens-section section" id="queens">

      <div className="container">

        {/* Section heading */}
        <div className="queens-section-heading">

          <span className="queens-eyebrow">
            <Sparkles size={15} />
            THE CROWN AWAITS
          </span>

          <h2>
            Meet Our <span>Elegant Queens</span>
          </h2>

          <p>
            Discover the remarkable ladies representing our heritage.
            Explore their profiles and support your favourite Queen.
          </p>

        </div>

        {/* Queen cards */}
        {sortedQueens.length > 0 ? (
          <div className="queens-grid">
            {sortedQueens.map((queen, index) => (
              <QueenCard
                key={queen.id}
                queen={queen}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="queens-empty">
            <Crown size={32} />
            <h3>Our Elegant Queens Are Coming Soon</h3>
            <p>Approved Queen profiles will appear here.</p>
          </div>
        )}

        {/* View all */}
        <div className="queens-section-footer">
          <Link to="/queens" className="queens-view-all">
            Discover All Queens
            <ArrowRight size={17} />
          </Link>
        </div>

      </div>

    </section>
  );
}

export default QueensSection;