import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FestivalIntro from '../components/FestivalIntro';
import QueenCard from '../components/QueenCard';
import QueensSection from '../components/QueensSection';
import Leaderboard from '../components/Leaderboard';
import HowToVote from '../components/HowToVote';

function Home() {
  return (
    <main>

      <Navbar />

      <Hero />

      <FestivalIntro />

      <QueenCard />

      <QueensSection />

      <Leaderboard />

      <HowToVote />
      
    </main>
  );
}

export default Home;