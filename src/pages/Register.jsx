
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Crown,
  ImagePlus,
  ShieldCheck,
} from 'lucide-react';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    address: '',
    phone: '',
    hairHeight: '',
    dateOfBirth: '',
    sponsorName: '',
    sponsorPhone: '',
    placeOfOrigin: '',
  });

  const [corporatePhoto, setCorporatePhoto] = useState(null);
  const [culturalPhoto, setCulturalPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const age = Number(formData.age);

    if (age < 16 || age > 28) {
      setMessage('Age must be between 16 and 28 years.');
      return;
    }

    if (!corporatePhoto || !culturalPhoto) {
      setMessage(
        'Please upload both your corporate and cultural photographs.'
      );
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="register-page">
        <section className="register-success">
          <CheckCircle2 size={54} />

          <span className="register-eyebrow">
            REGISTRATION FORM COMPLETED
          </span>

          <h1>Thank You, {formData.fullName}.</h1>

          <p>
            Your registration details have passed the
            frontend checks. In the current version, your
            information has not been sent to a server or
            saved for administrator review.
          </p>

          <Link to="/" className="register-submit-button">
            Return to Festival Home
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="register-page">
      <div className="register-container">
        <Link to="/" className="register-back-link">
          <ArrowLeft size={17} />
          Back to Festival
        </Link>

        <header className="register-heading">
          <span className="register-eyebrow">
            <Crown size={16} />
            BECOME A HERITAGE AMBASSADOR
          </span>

          <h1>
            Elegant Queen
            <span> Registration</span>
          </h1>

          <p>
            Take your place in the Nanku Cultural Heritage
            Festival. Complete your details carefully and
            provide your two required photographs.
          </p>

          <div className="register-security-note">
            <ShieldCheck size={18} />
            <span>
              Your application will require administrator
              approval before your profile goes live.
            </span>
          </div>
        </header>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          <div className="register-form-heading">
            <span>YOUR JOURNEY BEGINS HERE</span>
            <h2>Personal Information</h2>
            <p>Fields marked * are required.</p>
          </div>

          <div className="register-fields">
            <div className="register-field">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="age">Age *</label>
              <input
                id="age"
                name="age"
                type="number"
                min="16"
                max="28"
                value={formData.age}
                onChange={handleChange}
                placeholder="16–28"
                required
              />
              <small>Applicants must be 16–28 years old.</small>
            </div>

            <div className="register-field register-field-full">
              <label htmlFor="address">Residential Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your residential address"
                rows="3"
                autoComplete="street-address"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="phone">Phone / WhatsApp Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 08000000000"
                autoComplete="tel"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-field register-field-full">
              <label htmlFor="hairHeight">
                Hair Colour and Height *
              </label>
              <input
                id="hairHeight"
                name="hairHeight"
                value={formData.hairHeight}
                onChange={handleChange}
                placeholder="e.g. Black hair, 5 ft 7 in"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="sponsorName">Sponsor Name *</label>
              <input
                id="sponsorName"
                name="sponsorName"
                value={formData.sponsorName}
                onChange={handleChange}
                placeholder="Full name of sponsor"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="sponsorPhone">
                Sponsor Phone Number *
              </label>
              <input
                id="sponsorPhone"
                name="sponsorPhone"
                type="tel"
                value={formData.sponsorPhone}
                onChange={handleChange}
                placeholder="Sponsor's phone number"
                required
              />
            </div>

            <div className="register-field register-field-full">
              <label htmlFor="placeOfOrigin">
                Place of Origin / Village *
              </label>
              <input
                id="placeOfOrigin"
                name="placeOfOrigin"
                value={formData.placeOfOrigin}
                onChange={handleChange}
                placeholder="Enter your village or place of origin"
                required
              />
            </div>
          </div>

          <div className="register-form-heading register-photo-heading">
            <span>YOUR OFFICIAL PROFILE</span>
            <h2>Required Photographs</h2>
            <p>
              Choose clear, high-quality images. Both
              photographs are required.
            </p>
          </div>

          <div className="register-photo-grid">
            <div className="register-photo-field">
              <label htmlFor="corporatePhoto">
                Corporate Wear *
              </label>

              <label
                className="register-upload-box"
                htmlFor="corporatePhoto"
              >
                {corporatePhoto ? (
                  <img
                    src={URL.createObjectURL(corporatePhoto)}
                    alt="Corporate wear preview"
                  />
                ) : (
                  <>
                    <ImagePlus size={30} />
                    <strong>Upload Corporate Photo</strong>
                    <span>JPG, PNG or WebP</span>
                  </>
                )}
              </label>

              <input
                className="register-file-input"
                id="corporatePhoto"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  setCorporatePhoto(
                    event.target.files?.[0] || null
                  )
                }
                required
              />
            </div>

            <div className="register-photo-field">
              <label htmlFor="culturalPhoto">
                Cultural Wear *
              </label>

              <label
                className="register-upload-box"
                htmlFor="culturalPhoto"
              >
                {culturalPhoto ? (
                  <img
                    src={URL.createObjectURL(culturalPhoto)}
                    alt="Cultural wear preview"
                  />
                ) : (
                  <>
                    <ImagePlus size={30} />
                    <strong>Upload Cultural Photo</strong>
                    <span>JPG, PNG or WebP</span>
                  </>
                )}
              </label>

              <input
                className="register-file-input"
                id="culturalPhoto"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  setCulturalPhoto(
                    event.target.files?.[0] || null
                  )
                }
                required
              />
            </div>
          </div>

          {message && (
            <p className="register-error" role="alert">
              {message}
            </p>
          )}

          <div className="register-submit-note">
            <ShieldCheck size={19} />
            <p>
              Submitting this form in the current frontend
              demonstrates validation only. Secure storage,
              image uploads, and approval will be connected
              when the backend is built.
            </p>
          </div>

          <button
            type="submit"
            className="register-submit-button"
          >
            Submit Registration
            <ArrowRight size={18} />
          </button>
        </form>

        <footer className="register-footer">
          Nanku Cultural Heritage Festival
          <span>·</span>
          Showcasing Our Cultural Heritage
        </footer>
      </div>
    </main>
  );
}

export default Register;
