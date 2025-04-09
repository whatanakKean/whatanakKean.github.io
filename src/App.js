// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LeapNak from './pages/LeapNak';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leap-nak" element={<LeapNak />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;