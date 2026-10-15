import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
  };

  // Close the mobile menu when Escape is pressed.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'Elegant Queens', path: '/contestants' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'How to Vote', path: '/how-to-vote' },
  ];

  return (
    <header className={`navbar ${menuOpen ? 'menu-is-open' : ''}`}>
      <div className="navbar-container">

        {/* Festival Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="Nanku Cultural Heritage Festival home"
        >

          <div className="logo-text">
            <span>NKANU</span>
            <small>CULTURAL HERITAGE FESTIVAL</small>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationLinks.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}

          <Link to="/vote" className="desktop-vote" onClick={closeMenu}>
            Vote Now
          </Link>
        </nav>

        {/* Mobile Hamburger / X Button */}
        <button
          type="button"
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <div className="mobile-menu-heading">
            <span>EXPLORE THE FESTIVAL</span>
            <span className="mobile-menu-decoration" aria-hidden="true">
              .
            </span>
          </div>

          {navigationLinks.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className="mobile-nav-link"
              style={{ '--link-index': index }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="mobile-link-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span>{item.label}</span>

              <span className="mobile-link-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}

          <Link
            to="/vote"
            className="mobile-vote"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Vote Now
            <span aria-hidden="true"> →</span>
          </Link>

          <p className="mobile-menu-motto">
            Showcasing Our Cultural Heritage
          </p>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
