import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EventList from './components/EventList';
import AddEventForm from './components/AddEventForm';
import EditEventForm from './components/EditEventForm';
import 'tailwindcss/tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-blue-50 min-h-screen">
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Event Management System</h1>
          <div className="space-x-4">
            <Link to="/add-event" className="text-white px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600">Add Event</Link>
            <Link to="/" className="text-white px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 ml-10">List Events</Link>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<EventList />} exact />
            <Route path="/add-event" element={<AddEventForm />} />
            <Route path="/edit-event/:eventId" element={<EditEventForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
