import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventCrud() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewEvent(e.target.value);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.trim()) {
      setError('Event title cannot be empty');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/events', {
        title: newEvent
      });
      setEvents([...events, response.data]);
      setNewEvent('');
      setError('');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      <form onSubmit={handleAddEvent}>
        <label>
          Event Title:
          <input type="text" value={newEvent} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Event</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <p>Title: {event.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventCrud;
