import React from 'react';
import axios from 'axios';

function EventList() {
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`);
      // Update events list after deletion
      // You may need to fetch events again from the backend to reflect the changes
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Style the delete button with smaller fonts
  const deleteButtonStyle = {
    fontSize: 'smaller',
  };

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <p>Title: {event.title}</p>
            <button style={deleteButtonStyle} onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
