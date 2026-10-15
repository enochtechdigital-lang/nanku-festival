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
      <Route path="/" element={<Home />} />
      <Route path="/how-to-vote" element={<HowToVote />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;


