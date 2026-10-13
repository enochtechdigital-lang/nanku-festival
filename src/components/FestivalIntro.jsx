import { ArrowUpRight, Sparkles } from 'lucide-react';
import './FestivalIntro.css';

function FestivalIntro() {
  return (
    <section className="festival-intro section" id="about-festival">

      <div className="container festival-intro-grid">

        {/* Image */}
        <div className="festival-intro-image">

          <img
            src="/images/nanku festival.jpg"
            alt="People celebrating together at a cultural festival"
            loading="lazy"
          />

          <div className="intro-image-badge">
            <Sparkles size={17} />

            <div>
              <strong>Our Heritage</strong>
              <span>Our Pride</span>
            </div>
          </div>

          <div className="intro-image-number">
            <span>01</span>
          </div>

        </div>

        {/* Content */}
        <div className="festival-intro-content">

          <div className="section-title">

            <span className="eyebrow">
              The Festival
            </span>

            <h2>
              Celebrating
              <br />
              Our Heritage
            </h2>

            <p>
              The Nanku Cultural Heritage Festival is a celebration
              of our people, traditions, creativity and identity.
              It brings our community together through culture,
              entertainment and meaningful competition.
            </p>

          </div>

          <div className="intro-details">

            <div className="intro-detail">
              <span>01</span>

              <div>
                <h3>Celebrate Culture</h3>

                <p>
                  Experience the beauty, traditions and stories
                  that make our heritage unique.
                </p>
              </div>
            </div>

            <div className="intro-detail">
              <span>02</span>

              <div>
                <h3>Support Our Contestants</h3>

                <p>
                  Discover the contestants and show your support
                  through the official voting platform.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default FestivalIntro;