import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Vote from './pages/Vote';
import Register from './pages/Register';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import HowToVote from './pages/HowToVote';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<Home />} />

      {/* Voting */}
      <Route path="/vote" element={<Vote />} />
      <Route path="/how-to-vote" element={<HowToVote />} />

      {/* Contestants and rankings */}
      <Route path="/queens" element={<Home />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

      {/* Authentication */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Administration */}
      <Route path="/adminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
