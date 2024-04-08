import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventCrud from './events/EventCrud'; // Import EventCrud component
import Home from './Home';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#808080', color: '#fff', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', maxWidth: '960px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', color: 'cyan', fontWeight: 'bold', margin: 0, fontFamily: 'Arial, sans-serif' }}>Event Management App</h1>
          <nav style={{ marginLeft: 'auto' }}>
            <ul style={{ display: 'flex', gap: '20px', listStyleType: 'none', margin: 0, padding: 0 }}>
              <li>
                <Link to="/" style={{ color: 'cyan', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Home</Link>
              </li>
              <li>
                <Link to="/events/add" style={{ color: 'cyan', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Add New Event</Link>
              </li>
              <li>
                <Link to="/logout" style={{ color: 'cyan', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <Routes>
        <Route path="/events/add" element={<EventCrud />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
