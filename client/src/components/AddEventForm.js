import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddEventForm({ onAddEvent, editEventData, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editEventData) {
      setName(editEventData.name);
      setDescription(editEventData.description);
      setDate(editEventData.date);
    }
  }, [editEventData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = { name, description, date };

    try {
      if (editEventData) {
        await axios.put(`http://localhost:5000/events/${editEventData.id}`, eventData);
      } else {
        await axios.post('http://localhost:5000/events', eventData);
      }

      alert('Event saved successfully!');
      setName('');
      setDescription('');
      setDate('');
      onClose(); // Close the form popup
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{editEventData ? 'Edit Event' : 'Add Event'}</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        {editEventData ? 'Save Event' : 'Add Event'}
      </button>
    </form>
  );
}

export default AddEventForm;
