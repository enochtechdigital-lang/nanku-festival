
import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Copy,
  Crown,
  FileImage,
  Landmark,
  Minus,
  Plus,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react';

import queens from '../data/queens';
import './Vote.css';

const PRICE_PER_VOTE = 100;
const MAX_RECEIPT_SIZE = 5 * 1024 * 1024;

function generateFourDigitPin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function Vote() {
  const [searchParams] = useSearchParams();
  const queenId = searchParams.get('queen');

  const selectedQueen = queens.find(
    (queen) => String(queen.id) === String(queenId)
  );

  const [voteCount, setVoteCount] = useState(1);
  const [votingPin, setVotingPin] = useState('');
  const [stage, setStage] = useState('selection');
  const [copyMessage, setCopyMessage] = useState('');
  const [payerName, setPayerName] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [receiptError, setReceiptError] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  const totalAmount = voteCount * PRICE_PER_VOTE;

  const transferReference = selectedQueen
    ? `${votingPin} ${selectedQueen.name} ${voteCount} votes`
    : '';

  function handleGeneratePin() {
    if (!selectedQueen) return;

    setVotingPin(generateFourDigitPin());
    setCopyMessage('');
    setStage('payment');
  }

  async function handleCopy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${label} copied successfully.`);
    } catch {
      setCopyMessage(
        'Copy unavailable. Please select and copy the text manually.'
      );
    }
  }

  function handleReceiptChange(event) {
    const file = event.target.files?.[0];

    setReceiptError('');
    setSubmissionMessage('');

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setReceiptError('Upload a JPG, PNG or WebP receipt image.');
      event.target.value = '';
      setReceipt(null);
      return;
    }

    if (file.size > MAX_RECEIPT_SIZE) {
      setReceiptError('Your receipt must be 5 MB or smaller.');
      event.target.value = '';
      setReceipt(null);
      return;
    }

    setReceipt(file);
  }

  function handleSubmitReceipt(event) {
    event.preventDefault();
    setReceiptError('');
    setSubmissionMessage('');

    if (!payerName.trim()) {
      setReceiptError('Enter the name of the person who made the transfer.');
      return;
    }

    if (!/^0\d{10}$/.test(payerPhone.trim())) {
      setReceiptError('Enter a valid 11-digit Nigerian phone number.');
      return;
    }

    if (!receipt) {
      setReceiptError('Please upload your payment receipt screenshot.');
      return;
    }

    /*
      Frontend demonstration only.
      This does not upload the receipt or save a transaction.
      A backend must securely store and submit this information.
    */
    setIsSubmitted(true);
    setStage('submitted');
    setSubmissionMessage(
      'Demo complete. No receipt was uploaded to a server and no vote was recorded.'
    );
  }

  function handleBackToSelection() {
    setStage('selection');
    setVotingPin('');
    setCopyMessage('');
    setReceiptError('');
    setSubmissionMessage('');
  }

  function handleBackToPayment() {
    setStage('payment');
    setReceiptError('');
    setSubmissionMessage('');
  }

  return (
    <main className="vote-page">
      <div className="vote-page-container">
        <Link to="/" className="vote-back-link">
          <ArrowLeft size={17} />
          Back to Festival
        </Link>

        <header className="vote-page-heading">
          <span className="vote-eyebrow">
            <Crown size={15} />
            SUPPORT YOUR FAVOURITE
          </span>

          <h1>
            Cast Your <span>Vote</span>
          </h1>

          <p>
            Celebrate our heritage by supporting an Elegant Queen
            on her journey to becoming a Heritage Ambassador.
          </p>
        </header>

        {!selectedQueen ? (
          <section className="vote-select-queen">
            <h2>Choose an Elegant Queen</h2>
            <p>Select the Elegant Queen you want to support.</p>

            <div className="vote-queen-list">
              {queens.map((queen) => (
                <Link
                  key={queen.id}
                  to={`/vote?queen=${encodeURIComponent(queen.id)}`}
                  className="vote-queen-option"
                >
                  <img
                    src={queen.culturalImage}
                    alt={queen.name}
                    loading="lazy"
                  />

                  <div className="vote-queen-option-info">
                    <strong>{queen.name}</strong>
                    <span>{queen.town}</span>
                  </div>

                  <ArrowRight size={19} />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <>
            <div className="vote-checkout-grid">
              <section className="vote-selected-card">
                <div className="vote-card-image">
                  <img
                    src={selectedQueen.culturalImage}
                    alt={`Cultural portrait of ${selectedQueen.name}`}
                  />

                  <span className="vote-card-badge">
                    <Crown size={14} />
                    ELEGANT QUEEN
                  </span>
                </div>

                <div className="vote-card-details">
                  <span className="vote-card-label">
                    YOU ARE SUPPORTING
                  </span>

                  <h2>{selectedQueen.name}</h2>
                  <p>{selectedQueen.town}</p>

                  <div className="vote-card-confirmation">
                    <Check size={16} />
                    <span>Selected for voting</span>
                  </div>

                  <Link to="/#queens" className="vote-change-link">
                    Choose another Queen
                  </Link>
                </div>
              </section>

              {stage === 'selection' && (
                <section className="vote-order-card">
                  <div className="vote-order-heading">
                    <h2>Choose Your Votes</h2>
                    <p>Each vote costs ₦100.</p>
                  </div>

                  <div className="vote-price-banner">
                    <span>PRICE PER VOTE</span>
                    <strong>₦100</strong>
                  </div>

                  <div className="vote-quantity">
                    <div>
                      <strong>Number of votes</strong>
                      <span>Select your quantity</span>
                    </div>

                    <div className="vote-quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          setVoteCount((current) => Math.max(1, current - 1))
                        }
                        disabled={voteCount <= 1}
                        aria-label="Decrease votes"
                      >
                        <Minus size={18} />
                      </button>

                      <output aria-live="polite">{voteCount}</output>

                      <button
                        type="button"
                        onClick={() =>
                          setVoteCount((current) => current + 1)
                        }
                        aria-label="Increase votes"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="vote-quick-options">
                    {[1, 5, 10, 20].map((quantity) => (
                      <button
                        type="button"
                        key={quantity}
                        className={
                          voteCount === quantity
                            ? 'vote-quick-option active'
                            : 'vote-quick-option'
                        }
                        onClick={() => setVoteCount(quantity)}
                      >
                        {quantity} {quantity === 1 ? 'Vote' : 'Votes'}
                      </button>
                    ))}
                  </div>

                  <div className="vote-total">
                    <div>
                      <span>Payment total</span>
                      <small>{voteCount} × ₦{PRICE_PER_VOTE}</small>
                    </div>

                    <strong>₦{totalAmount.toLocaleString('en-NG')}</strong>
                  </div>

                  <button
                    type="button"
                    className="vote-proceed-button"
                    onClick={handleGeneratePin}
                  >
                    Generate Voting PIN
                    <ArrowRight size={18} />
                  </button>

                  <div className="vote-security-note">
                    <ShieldCheck size={19} />
                    <p>
                      Votes remain pending until payment is verified
                      by the festival administrator.
                    </p>
                  </div>
                </section>
              )}

              {stage === 'payment' && (
                <section className="vote-order-card payment-instructions">
                  <button
                    type="button"
                    className="payment-back-button"
                    onClick={handleBackToSelection}
                  >
                    <ArrowLeft size={17} />
                    Back to vote selection
                  </button>

                  <div className="payment-stage-heading">
                    <span className="vote-eyebrow">
                      <ShieldCheck size={16} />
                      PAYMENT INSTRUCTIONS
                    </span>

                    <h2>Secure Your Vote</h2>

                    <p>
                      Transfer the exact amount and include your
                      PIN in the transfer narration.
                    </p>
                  </div>

                  <div className="payment-pin-box">
                    <span>YOUR VOTING PIN</span>
                    <strong>{votingPin}</strong>

                    <p>Keep this PIN for your payment reference.</p>

                    <button
                      type="button"
                      className="payment-copy-button"
                      onClick={() => handleCopy(votingPin, 'PIN')}
                    >
                      <Copy size={16} />
                      Copy PIN
                    </button>
                  </div>

                  <div className="payment-summary">
                    <div>
                      <span>Elegant Queen</span>
                      <strong>{selectedQueen.name}</strong>
                    </div>

                    <div>
                      <span>Number of votes</span>
                      <strong>{voteCount}</strong>
                    </div>

                    <div>
                      <span>Price per vote</span>
                      <strong>₦100</strong>
                    </div>

                    <div className="payment-total-row">
                      <span>Total to transfer</span>
                      <strong>₦{totalAmount.toLocaleString('en-NG')}</strong>
                    </div>
                  </div>

                  <div className="payment-bank-card">
                    <div className="payment-bank-heading">
                      <Landmark size={19} />
                      <h3>Transfer to the Festival</h3>
                    </div>

                    <div className="payment-bank-detail">
                      <span>Bank</span>
                      <strong>OPay</strong>
                    </div>

                    <div className="payment-bank-detail">
                      <span>Account name</span>
                      <strong>Nanku Cultural Heritage Festival</strong>
                    </div>

                    <div className="payment-bank-detail">
                      <span>Account number</span>
                      <strong>9132215175</strong>
                    </div>
                  </div>

                  <div className="payment-warning">
                    <strong>IMPORTANT — INCLUDE YOUR PIN IN THE NARRATION</strong>

                    <p>
                      Include your PIN, the Queen's name and the
                      number of votes in your transfer narration.
                    </p>

                    <code>{transferReference}</code>

                    <button
                      type="button"
                      className="payment-copy-button payment-copy-reference"
                      onClick={() =>
                        handleCopy(transferReference, 'Transfer reference')
                      }
                    >
                      <Copy size={15} />
                      Copy transfer reference
                    </button>

                    <p>
                      A missing or incorrect PIN may delay verification.
                      Never submit a false receipt.
                    </p>
                  </div>

                  <div className="payment-pending-note">
                    <Clock size={19} />
                    <p>
                      Your votes do not count immediately after transfer.
                      They remain pending until an administrator verifies
                      the payment.
                    </p>
                  </div>

                  {copyMessage && (
                    <p className="payment-copy-message" role="status">
                      {copyMessage}
                    </p>
                  )}

                  <button
                    type="button"
                    className="vote-proceed-button receipt-start-button"
                    onClick={() => {
                      setCopyMessage('');
                      setStage('receipt');
                    }}
                  >
                    I've Made Payment — Submit Receipt
                    <ArrowRight size={18} />
                  </button>

                  <p className="payment-next-note">
                    Only continue after completing your bank transfer.
                    Your payment still requires manual verification.
                  </p>
                </section>
              )}

              {stage === 'receipt' && (
                <section className="vote-order-card receipt-card">
                  <button
                    type="button"
                    className="payment-back-button"
                    onClick={handleBackToPayment}
                  >
                    <ArrowLeft size={17} />
                    Back to payment instructions
                  </button>

                  <div className="payment-stage-heading">
                    <span className="vote-eyebrow">
                      <FileImage size={16} />
                      RECEIPT SUBMISSION
                    </span>

                    <h2>Submit Your Receipt</h2>

                    <p>
                      Enter the transfer details and select a clear
                      screenshot of your payment receipt.
                    </p>
                  </div>

                  <div className="receipt-reference-card">
                    <span>YOUR PAYMENT REFERENCE</span>
                    <strong>{votingPin}</strong>
                    <p>{selectedQueen.name} · {voteCount} votes</p>
                    <strong>₦{totalAmount.toLocaleString('en-NG')}</strong>
                  </div>

                  <form
                    className="receipt-form"
                    onSubmit={handleSubmitReceipt}
                  >
                    <div className="receipt-field">
                      <label htmlFor="payerName">
                        Payer's full name
                      </label>
                      <input
                        id="payerName"
                        name="payerName"
                        type="text"
                        autoComplete="name"
                        placeholder="Name used for the transfer"
                        value={payerName}
                        onChange={(event) => setPayerName(event.target.value)}
                        maxLength={100}
                        required
                      />
                    </div>

                    <div className="receipt-field">
                      <label htmlFor="payerPhone">
                        Payer's phone number
                      </label>
                      <input
                        id="payerPhone"
                        name="payerPhone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="08012345678"
                        value={payerPhone}
                        onChange={(event) =>
                          setPayerPhone(event.target.value.replace(/\D/g, '').slice(0, 11))
                        }
                        maxLength={11}
                        pattern="0[0-9]{10}"
                        required
                      />
                      <small>Enter an 11-digit Nigerian number.</small>
                    </div>

                    <div className="receipt-field">
                      <label htmlFor="receiptFile">
                        Payment receipt screenshot
                      </label>

                      <input
                        ref={fileInputRef}
                        id="receiptFile"
                        name="receiptFile"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleReceiptChange}
                        required
                        className="receipt-file-input"
                      />

                      <label
                        htmlFor="receiptFile"
                        className="receipt-upload-area"
                      >
                        <Upload size={25} />
                        <strong>
                          {receipt ? 'Receipt selected' : 'Choose receipt image'}
                        </strong>
                        <span>
                          {receipt
                            ? receipt.name
                            : 'JPG, PNG or WebP · Maximum 5 MB'}
                        </span>
                      </label>

                      {receipt && (
                        <button
                          type="button"
                          className="receipt-remove-button"
                          onClick={() => {
                            setReceipt(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          <X size={15} />
                          Remove selected file
                        </button>
                      )}
                    </div>

                    <div className="receipt-confirmation-note">
                      <ShieldCheck size={19} />
                      <p>
                        Your PIN, selected Queen, vote quantity and amount
                        are attached to this form in the current page state.
                        The administrator must verify your transfer.
                      </p>
                    </div>

                    {receiptError && (
                      <p className="receipt-error" role="alert">
                        {receiptError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="vote-proceed-button"
                    >
                      Submit Receipt for Review
                      <ArrowRight size={18} />
                    </button>

                    <p className="receipt-privacy-note">
                      Demo only: this form does not yet upload your file
                      or send information to an administrator.
                    </p>
                  </form>
                </section>
              )}

              {stage === 'submitted' && (
                <section className="vote-order-card receipt-success-card">
                  <div className="receipt-success-icon">
                    <Check size={30} />
                  </div>

                  <span className="vote-eyebrow">DEMO SUBMISSION COMPLETE</span>

                  <h2>Receipt Form Completed</h2>

                  <p>
                    Your form passed the frontend checks. This is not
                    confirmation of payment or a recorded vote.
                  </p>

                  <div className="receipt-reference-card">
                    <span>PAYMENT REFERENCE</span>
                    <strong>{votingPin}</strong>
                    <p>{selectedQueen.name} · {voteCount} votes</p>
                    <strong>₦{totalAmount.toLocaleString('en-NG')}</strong>
                  </div>

                  <p className="receipt-demo-warning" role="status">
                    {submissionMessage}
                  </p>

                  <button
                    type="button"
                    className="vote-proceed-button"
                    onClick={() => {
                      setPayerName('');
                      setPayerPhone('');
                      setReceipt(null);
                      setVotingPin('');
                      setVoteCount(1);
                      setCopyMessage('');
                      setReceiptError('');
                      setSubmissionMessage('');
                      setIsSubmitted(false);
                      setStage('selection');
                    }}
                  >
                    Start Another Vote
                    <ArrowRight size={18} />
                  </button>
                </section>
              )}
            </div>
          </>
        )}

        <footer className="vote-page-footer">
          <ShieldCheck size={15} />
          Nanku Cultural Heritage Festival
          <span>·</span>
          Showcasing Our Cultural Heritage
        </footer>
      </div>
    </main>
  );
}

export default Vote;
