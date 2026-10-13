import React, { useState } from 'react';
import './QueenCard.css';

export default function QueenCard({ queen }) {
  // Safe check to prevent white page crash if queen object is missing
  if (!queen) return null;

  const [showCultural, setShowCultural] = useState(false);

  // Fallback image handlers
  const culturalImg = queen.culturalImage || queen.photoCultural || queen.image || "/images/nanku festival.jpg";
  const corporateImg = queen.corporateImage || queen.photoCorporate || queen.image || "/images/nanku festival.jpg";

  return (
    <div className="queen-card">
      <div 
        className="card-image-container"
        onClick={() => setShowCultural(!showCultural)}
      >
        <img 
          src={showCultural ? culturalImg : corporateImg} 
          alt={queen.name || "Queen Candidate"} 
        />
        <span className="wear-badge">
          {showCultural ? "Cultural Wear 👑" : "Corporate Wear (Tap to flip)"}
        </span>
      </div>

      <div className="card-info">
        <h3 className="queen-name">{queen.name || "Contestant"}</h3>
        
        <div className="detail-grid">
          <p><strong>Town:</strong> {queen.town || "N/A"}</p>
          <p><strong>Origin:</strong> {queen.origin || "N/A"}</p>
          <p><strong>Sponsor:</strong> {queen.sponsorName || queen.sponsor || "N/A"}</p>
        </div>

        <div className="votes-display">
          <span>Total Votes:</span>
          <span className="vote-number">{queen.votesCount || queen.votes || 0}</span>
        </div>

        <button className="btn-vote">
          Vote Now (₦100)
        </button>
      </div>
    </div>
  );
}