import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEventForm from './AddEventForm';

function EventList() {
  const [events, setEvents] = useState([]);
  const [editEventData, setEditEventData] = useState(null);

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

  const handleAddEvent = async (newEventData) => {
    try {
      const response = await axios.post('http://localhost:5000/events', newEventData);
      const newEvent = response.data;
      setEvents([...events, newEvent]);
      // Close the popup only if the event is successfully added
      alert('Event added successfully!');
      setEditEventData(null);
    } catch (error) {
      console.error('Failed to add event', error);
      alert('Failed to add event. Please try again.');
    }
  };
  

  const handleEditEvent = (event) => {
    setEditEventData(event);
  };
  
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
      alert('Event deleted successfully!');
    } catch (error) {
      console.error(`Failed to delete event with ID ${eventId}`, error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const handleFormClose = () => {
    setEditEventData(null);
  };

  return (
    <div className="container mx-auto grid grid-cols-3 gap-6">
      {events.map(event => (
        <div key={event.id} className="border rounded-md p-4 flex flex-col justify-between">
          <div>
            <img src={event.imageUrl} alt={event.name} className="object-cover w-full h-36 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
            <p className="text-gray-500 mb-2">{event.date}</p>
            <p className="text-gray-600 mb-4">{event.description}</p>
          </div>
          <div className="flex justify-between">
            <button onClick={() => handleEditEvent(event)} className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-2 rounded-md mr-2 text-sm">Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)} className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-2 rounded-md text-sm">Delete</button>
          </div>
        </div>
      ))}
      {editEventData && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <AddEventForm onAddEvent={handleAddEvent} editEventData={editEventData} onClose={handleFormClose} />
        </div>
      )}
    </div>
  );
}

export default EventList;
