
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileImage,
  Hash,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import './HowToVote.css';

const votingSteps = [
  {
    number: '01',
    icon: UserRound,
    title: 'Choose Your Elegant Queen',
    description:
      'Explore the contestant profiles and select the Queen you want to support.',
  },
  {
    number: '02',
    icon: Hash,
    title: 'Choose Your Votes',
    description:
      'Each vote costs ₦100. Select your quantity and review the total before proceeding.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Generate Your Voting PIN',
    description:
      'Generate your four-digit PIN. Keep it safe and include it in your transfer narration.',
  },
  {
    number: '04',
    icon: CreditCard,
    title: 'Make Your Payment',
    description:
      'Transfer the exact amount to the festival account shown on the voting payment screen.',
  },
  {
    number: '05',
    icon: FileImage,
    title: 'Submit Your Receipt',
    description:
      'Enter the payer details and select a clear payment receipt image for review.',
  },
  {
    number: '06',
    icon: CheckCircle2,
    title: 'Wait for Verification',
    description:
      'Your vote remains pending until the festival administrator verifies the payment.',
  },
];

function HowToVote() {
  return (
    <main className="how-to-vote-page">
      <div className="how-to-vote-container">
        <header className="how-to-vote-heading">
          <span className="how-to-vote-eyebrow">
            NKANU CULTURAL HERITAGE FESTIVAL
          </span>

          <h1>
            How to <span>Vote</span>
          </h1>

          <p>
            Your guide to supporting an Elegant Queen and
            celebrating our cultural heritage.
          </p>
        </header>

        <section className="voting-steps">
          {votingSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article className="voting-step" key={step.number}>
                <div className="voting-step-number">
                  {step.number}
                </div>

                <div className="voting-step-icon">
                  <Icon size={24} />
                </div>

                <div className="voting-step-content">
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="voting-important-note">
          <ShieldCheck size={24} />

          <div>
            <h2>Important Payment Notice</h2>
            <p>
              Always use the payment details displayed on the
              official voting page. Include your PIN, the Queen's
              name, and the number of votes in your transfer narration.
              Never submit a false receipt.
            </p>
          </div>
        </section>

        <div className="how-to-vote-actions">
          <Link to="/vote" className="how-to-vote-secondary">
            Explore Queens
          </Link>

          <Link to="/vote" className="how-to-vote-primary">
            Start Voting
            <ArrowRight size={18} />
          </Link>
        </div>

        <p className="how-to-vote-disclaimer">
          Receipt submission on the current frontend is a demonstration.
          A successful form submission does not confirm payment or record a vote.
        </p>
      </div>
    </main>
  );
}

export default HowToVote;
