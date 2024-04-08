import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Could not fetch events', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`);
      alert('Event deleted successfully');
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event', error);
      alert('Failed to delete event');
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`); // Navigate to the edit page for this event
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border rounded-md p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-gray-500">{event.date} - {event.description}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(event.id)} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Edit</button>
                <button onClick={() => deleteEvent(event.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventList;
