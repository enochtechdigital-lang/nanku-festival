import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  ShieldCheck,
  Crown,
} from 'lucide-react';

import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('voter');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const cleanPhone = phone.trim();

    if (!cleanPhone || !password.trim()) {
      setError('Please enter your phone number and password.');
      return;
    }

    if (!/^[0-9+\s()-]{10,16}$/.test(cleanPhone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    // Frontend demonstration only.
    // Real authentication will be connected to the backend later.
    setError(
      'Login is not connected yet. Your details have not been authenticated.'
    );
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <Link to="/" className="login-back-link">
          <ArrowLeft size={17} />
          <span>Back to Festival</span>
        </Link>

        <section className="login-card">
          <header className="login-header">
            <div className="login-emblem" aria-hidden="true">
              <Crown size={27} />
            </div>

            <span className="login-eyebrow">
              NKANUCULTURAL HERITAGE FESTIVAL
            </span>

            <h1>
              Welcome <span>Back</span>
            </h1>

            <p>
              Sign in to continue your cultural heritage journey.
            </p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            <fieldset className="login-account-fieldset">
              <legend>Choose your account</legend>

              <div className="login-account-options">
                <button
                  type="button"
                  className={
                    accountType === 'voter'
                      ? 'login-account-option active'
                      : 'login-account-option'
                  }
                  onClick={() => setAccountType('voter')}
                  aria-pressed={accountType === 'voter'}
                >
                  <ShieldCheck size={17} />
                  <span>Voter</span>
                </button>

                <button
                  type="button"
                  className={
                    accountType === 'contestant'
                      ? 'login-account-option active'
                      : 'login-account-option'
                  }
                  onClick={() => setAccountType('contestant')}
                  aria-pressed={accountType === 'contestant'}
                >
                  <Crown size={17} />
                  <span>Elegant Queen</span>
                </button>
              </div>
            </fieldset>

            <div className="login-field">
              <label htmlFor="login-phone">Phone number</label>

              <div className="login-input-wrapper">
                <Phone size={18} aria-hidden="true" />

                <input
                  id="login-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>

              <div className="login-input-wrapper">
                <LockKeyhole size={18} aria-hidden="true" />

                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <div className="login-form-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />
                <span>Remember me</span>
              </label>

              <span className="login-password-note">
                Keep your password private
              </span>
            </div>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="login-submit-button">
              Sign In
            </button>

            <p className="login-register-prompt">
              Don't have an account?{' '}
              <Link to="/register">Create an account</Link>
            </p>
          </form>

          <div className="login-security-note">
            <ShieldCheck size={18} />

            <p>
              Your account is intended to provide a secure and
              transparent festival experience.
            </p>
          </div>
        </section>

        <footer className="login-footer">
          Showcasing Our Cultural Heritage
        </footer>
      </div>
    </main>
  );
}

export default Login;