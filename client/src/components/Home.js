// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCrud from './comments/CommentCrud';


function Home() {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <p>Title: {event.title}</p>
            <p>Description: {event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <CommentCrud eventId={event.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
