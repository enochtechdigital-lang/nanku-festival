import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Vote from './pages/Vote';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;


