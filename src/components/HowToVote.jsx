
import {
  Users,
  Hash,
  Smartphone,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './HowToVote.css';

const votingSteps = [
  {
    number: '01',
    icon: Users,
    title: 'Choose Your Elegant Queen',
    description:
      'Explore the Queen profiles and select the lady you want to support.',
  },
  {
    number: '02',
    icon: Hash,
    title: 'Generate Your Voting PIN',
    description:
      'Choose how many votes you want. Each vote costs ₦100. Generate a unique four-digit PIN for your transaction.',
  },
  {
    number: '03',
    icon: Smartphone,
    title: 'Make Your Transfer',
    description:
      'Transfer the exact amount to the official festival account. Include your PIN and Queen’s name in the transfer narration.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Submit and Verify',
    description:
      'Submit your payment receipt. Your votes remain pending until the festival administrator verifies your payment.',
  },
];

function HowToVote() {
  return (
    <section className="how-to-vote section" id="how-to-vote">
      <div className="container">

        <div className="how-to-vote-heading">
          <span className="how-to-vote-eyebrow">
            SIMPLE. SECURE. TRANSPARENT.
          </span>

          <h2>
            How to <span>Vote</span>
          </h2>

          <p>
            Support your favourite Elegant Queen in four simple steps.
            Every payment is reviewed before votes are counted.
          </p>
        </div>

        <div className="voting-steps">
          {votingSteps.map((step) => {
            const StepIcon = step.icon;

            return (
              <article className="voting-step" key={step.number}>
                <div className="voting-step-top">
                  <span className="voting-step-number">
                    {step.number}
                  </span>

                  <div className="voting-step-icon">
                    <StepIcon size={23} strokeWidth={1.7} />
                  </div>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="voting-price-note">
          <div>
            <span>OFFICIAL VOTING PRICE</span>
            <strong>₦100 <small>/ vote</small></strong>
          </div>

          <p>
            Keep your PIN and payment receipt until your votes
            have been verified.
          </p>
        </div>

        <div className="how-to-vote-action">
          <Link to="/vote" className="how-to-vote-button">
            Start Voting
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HowToVote;
