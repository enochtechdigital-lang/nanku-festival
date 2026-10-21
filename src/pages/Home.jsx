import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FestivalIntro from '../components/FestivalIntro';
import QueensSection from '../components/QueensSection';
import Leaderboard from '../components/Leaderboard';
import Footer from '../components/Footer';

function Home() {
  return (
    <main className="home-page">
      <Navbar />

      <Hero />

      <FestivalIntro />

      <QueensSection />

      <Leaderboard />

      <Footer />
    </main>
  );
}

export default Home;
