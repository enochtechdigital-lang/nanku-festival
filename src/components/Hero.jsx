import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

/*
  IMPORTANT:
  Replace this placeholder with the actual voting deadline.
  The date must be in the future for the countdown to run.

  Example format:
  2026-12-31T23:59:59+01:00

  The +01:00 offset represents Nigerian time.
*/

const VOTING_DEADLINE = '2026-12-31T23:59:59+01:00';

const heroSlides = [
  {
    image: '/images/nanku festival.jpg',
    alt: 'Cultural celebration at the Nanku Heritage Festival',
    position: 'center',
  },
  {
    image: '/images/nanku dance.jpg',
    alt: 'Traditional Igbo cultural dance',
    position: 'center',
  },
  {
    image: '/images/nanku masquarade.jpg',
    alt: 'Traditional masquerade celebrating Igbo heritage',
    position: 'center',
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [failedImages, setFailedImages] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);

  /*
    Automatically rotate the background images.
    The slideshow stops advancing when reduced motion is preferred.
  */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (mediaQuery.matches) {
      return undefined;
    }

    const slideInterval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(slideInterval);
  }, []);

  /*
    Countdown timer.
    Update the display every second until the voting deadline.
  */

  useEffect(() => {
    const deadline = new Date(VOTING_DEADLINE).getTime();

    if (Number.isNaN(deadline)) {
      setTimeLeft({ status: 'invalid' });
      return undefined;
    }

    const updateCountdown = () => {
      const difference = deadline - Date.now();

      if (difference <= 0) {
        setTimeLeft({ status: 'ended' });
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        status: 'active',
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const countdownInterval = window.setInterval(
      updateCountdown,
      1000
    );

    return () => window.clearInterval(countdownInterval);
  }, []);

  const handleImageError = (imagePath) => {
    setFailedImages((current) =>
      current.includes(imagePath)
        ? current
        : [...current, imagePath]
    );
  };

  const visibleSlides = heroSlides.filter(
    (slide) => !failedImages.includes(slide.image)
  );

  const activeImage = visibleSlides.length
    ? visibleSlides[activeSlide % visibleSlides.length]
    : null;

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
    >
      {/* ================================================
          CULTURAL BACKGROUND SLIDESHOW
      ================================================= */}

      <div
        className="hero-background"
        aria-hidden="true"
      >
        {heroSlides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            className={[
              'hero-slide',
              index === activeSlide ? 'is-active' : '',
              failedImages.includes(slide.image)
                ? 'is-failed'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              objectPosition: slide.position,
            }}
            onError={() => handleImageError(slide.image)}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        ))}
      </div>

      {/* Dark overlays improve text readability */}

      <div
        className="hero-overlay"
        aria-hidden="true"
      />

      <div
        className="hero-vignette"
        aria-hidden="true"
      />

      {/* Cultural decorations */}

      <div
        className="hero-pattern hero-pattern-left"
        aria-hidden="true"
      />

      <div
        className="hero-pattern hero-pattern-right"
        aria-hidden="true"
      />

      {/* ================================================
          MAIN HERO CONTENT
      ================================================= */}

      <div className="container hero-container">
        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="eyebrow-line" />

            <span>Celebrating Culture &amp; Heritage</span>

            <span className="eyebrow-line" />
          </div>

          <h1 id="hero-title">
            Nanku
            <span>Cultural Heritage Festival</span>
          </h1>

          <p className="hero-motto">
            Showcasing Our Cultural Heritage
          </p>

          <p className="hero-description">
            Celebrate our roots, preserve our traditions,
            and support our Elegant Queens. Be part of a
            cultural experience that brings our community
            together.
          </p>

          {/* Primary actions */}

          <div className="hero-actions">

            <Link
              to="/vote"
              className="btn btn-gold hero-primary-btn"
            >
              <span>Vote Now</span>

              <ArrowRight
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/register"
              className="btn hero-secondary-btn"
            >
              Register as Elegant Queen
            </Link>

          </div>

          {/* ============================================
              VOTING COUNTDOWN
          ============================================ */}

          <div
            className="hero-countdown"
            aria-label="Voting countdown"
          >
            <p className="countdown-label">
              {timeLeft?.status === 'ended'
                ? 'Voting period has ended'
                : 'Voting closes in'}
            </p>

            {timeLeft?.status === 'active' && (
              <div
                className="countdown-values"
                aria-live="off"
              >
                <div className="countdown-unit">
                  <span>{timeLeft.days}</span>
                  <small>Days</small>
                </div>

                <span className="countdown-separator">:</span>

                <div className="countdown-unit">
                  <span>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <small>Hours</small>
                </div>

                <span className="countdown-separator">:</span>

                <div className="countdown-unit">
                  <span>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <small>Minutes</small>
                </div>

                <span className="countdown-separator">:</span>

                <div className="countdown-unit">
                  <span>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <small>Seconds</small>
                </div>
              </div>
            )}

            {timeLeft?.status === 'invalid' && (
              <p className="countdown-message">
                Voting deadline has not been configured.
              </p>
            )}

            {timeLeft?.status === 'ended' && (
              <p className="countdown-message">
                Thank you for celebrating Nanku heritage.
              </p>
            )}
          </div>

          {/* Trust message */}

          <div className="hero-trust">
            <span
              className="trust-dot"
              aria-hidden="true"
            />

            <span>
              Celebrate Culture. Support Your Favorite Elegant Queen.
            </span>
          </div>

        </div>

        {/* ================================================
            SLIDESHOW CONTROLS
        ================================================= */}

        {visibleSlides.length > 1 && (
          <div
            className="hero-slide-controls"
            aria-label="Cultural slideshow controls"
          >
            {visibleSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                className={[
                  'hero-slide-dot',
                  activeImage?.image === slide.image
                    ? 'is-active'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={activeImage?.image === slide.image}
                onClick={() => {
                  const originalIndex = heroSlides.findIndex(
                    (item) => item.image === slide.image
                  );

                  setActiveSlide(originalIndex);
                }}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator */}

        <a
          href="#about-festival"
          className="hero-scroll"
          aria-label="Explore the festival introduction"
        >
          <span>Explore</span>

          <ArrowDown
            size={17}
            aria-hidden="true"
          />
        </a>
      </div>

      {/* Decorative bottom line */}

      <div
        className="hero-bottom-line"
        aria-hidden="true"
      />
    </section>
  );
}

export default Hero;
