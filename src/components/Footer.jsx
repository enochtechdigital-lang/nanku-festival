import { Link } from 'react-router-dom';
import {
ArrowUpRight,
Crown,
Mail,
MapPin,
Phone,
} from 'lucide-react';
import './Footer.css';

function Footer() {
return (
<footer className="festival-footer">
<div className="festival-footer-container">
<div className="festival-footer-main">
<div className="festival-footer-brand">
<Link to="/" className="festival-footer-logo">
<span className="festival-footer-crown">
<Crown size={25} strokeWidth={1.5} />
</span>

          <span className="festival-footer-brand-text">
            <strong>NKANU</strong>
            <small>CULTURAL HERITAGE FESTIVAL</small>
          </span>
        </Link>

        <p>
          Celebrating our roots, preserving our traditions, and
          showcasing the beauty of our cultural heritage.
        </p>

        <span className="festival-footer-motto">
          Showcasing Our Cultural Heritage
        </span>
      </div>

      <div className="festival-footer-links">
        <h3>Explore</h3>
        <Link to="/">Home</Link>
        <Link to="/contestants">Elegant Queens</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/how-to-vote">How to Vote</Link>
      </div>

      <div className="festival-footer-links">
        <h3>Participate</h3>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/vote">Start Voting</Link>
      </div>

      <div className="festival-footer-contact">
        <h3>Festival Information</h3>

        <p>
          <MapPin size={17} />
          <span>Nkanu Cultural Heritage Festival</span>
        </p>

        <a href="tel:+2340000000000">
          <Phone size={17} />
          <span>Contact the Festival Team</span>
        </a>

        <a href="mailto:info@nkanufestival.com">
          <Mail size={17} />
          <span>Email the Festival Team</span>
        </a>
      </div>
    </div>

    <div className="festival-footer-bottom">
      <p>
        © {new Date().getFullYear()} Nkanu Cultural Heritage Festival.
        All rights reserved.
      </p>

      <Link to="/" className="festival-footer-back-top">
        Back to Home
        <ArrowUpRight size={16} />
      </Link>
    </div>
  </div>
</footer>

);
}

export default Footer;