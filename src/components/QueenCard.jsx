
import { useState } from 'react';
import { Crown, MapPin, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './QueenCard.css';

export default function QueenCard({ queen, rank }) {
  const [showCultural, setShowCultural] = useState(false);
  const navigate = useNavigate();

const handleVote = () => {
  navigate('/vote', {
    state: {
      queenId: queen.id,
      queenName: queen.name,
    },
  });
};

  if (!queen) return null;

  const culturalImg =
    queen.culturalImage ||
    queen.photoCultural ||
    queen.image ||
    '/images/nanku festival.jpg';

  const corporateImg =
    queen.corporateImage ||
    queen.photoCorporate ||
    queen.image ||
    '/images/nanku festival.jpg';

  const image = showCultural ? culturalImg : corporateImg;

  return (
    <article className="queen-card">
      <div className="queen-card-image">
        <img
          src={image}
          alt={`${queen.name || 'Elegant Queen'} in ${
            showCultural ? 'cultural' : 'corporate'
          } wear`}
          loading="lazy"
        />

        {rank != null && (
          <span className="queen-rank">
            <Crown size={14} />
            Rank #{rank}
          </span>
        )}

        <div className="queen-vote-count">
          <strong>{queen.totalVotes ?? queen.votesCount ?? queen.votes ?? 0}</strong>
          <span>Votes</span>
        </div>

        <button
          type="button"
          className="queen-image-toggle"
          onClick={() => setShowCultural((current) => !current)}
          aria-label={`Switch to ${showCultural ? 'corporate' : 'cultural'} wear`}
        >
          <ArrowLeftRight size={15} />
          {showCultural ? 'Corporate Wear' : 'Cultural Wear'}
        </button>
      </div>

      <div className="queen-card-content">
        <span className="queen-card-label">NANKU CULTURAL HERITAGE</span>

        <h3>{queen.name || 'Elegant Queen'}</h3>

        <div className="queen-card-location">
          <MapPin size={16} />
          <span>
            {queen.town || 'Town not provided'}
            {queen.placeOfOrigin
              ? ` · Origin: ${queen.placeOfOrigin}`
              : queen.origin
                ? ` · Origin: ${queen.origin}`
                : ''}
          </span>
        </div>

        <div className="queen-card-divider" />

        <div className="queen-card-details">
          <div>
            <span>Hair Colour</span>
            <strong>{queen.hairColour || queen.hairColor || 'Not provided'}</strong>
          </div>

          <div>
            <span>Height</span>
            <strong>{queen.height || 'Not provided'}</strong>
          </div>

          <div>
            <span>Sponsored By</span>
            <strong>{queen.sponsorName || queen.sponsor || 'Not provided'}</strong>
          </div>
        </div>

        <button
  type="button"
  className="queen-vote-button"
  onClick={handleVote}
>
  Vote for Her — ₦100
</button>

      </div>
    </article>
  );
}
