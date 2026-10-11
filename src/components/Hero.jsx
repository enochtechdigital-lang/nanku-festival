import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">

      {/* Background image */}
      <div className="hero-background">
        <img
          src="/images/nanku festival.jpg"
          alt="Cultural celebration"
        />
      </div>

      {/* Cinematic overlays */}
      <div className="hero-overlay"></div>
      <div className="hero-vignette"></div>

      {/* Decorative cultural pattern */}
      <div className="hero-pattern hero-pattern-left"></div>
      <div className="hero-pattern hero-pattern-right"></div>

      <div className="container hero-container">

        <div className="hero-content">

          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span className="eyebrow-line"></span>

            <span>Celebrating Culture & Heritage</span>

            <span className="eyebrow-line"></span>
          </div>

          {/* Main heading */}
          <h1>
            Nanku
            <span>Cultural Heritage Festival</span>
          </h1>

          {/* Motto */}
          <p className="hero-motto">
            Showcasing Our Cultural Heritage
          </p>

          {/* Description */}
          <p className="hero-description">
            Celebrate our roots, support our contestants,
            and be part of a cultural experience that brings
            our community together.
          </p>

          {/* CTA buttons */}
          <div className="hero-actions">

            <Link
              to="/vote"
              className="btn btn-gold hero-primary-btn"
            >
              Vote Now
              <ArrowRight size={18} strokeWidth={2.2} />
            </Link>

            <Link
              to="/register"
              className="btn hero-secondary-btn"
            >
              Register as Contestant
            </Link>

          </div>

          {/* Trust message */}
          <div className="hero-trust">
            <span className="trust-dot"></span>

            <span>
              Celebrate Culture. Support Your Favorite Contestant.
            </span>
          </div>

        </div>

        {/* Scroll indicator */}
        <a
          href="#about-festival"
          className="hero-scroll"
          aria-label="Scroll to festival introduction"
        >
          <span>Explore</span>

          <ArrowDown size={17} />

        </a>

      </div>

      {/* Bottom gold line */}
      <div className="hero-bottom-line"></div>

    </section>
  );
}

export default Hero;