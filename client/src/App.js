import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [eventId, setEventId] = useState(''); 
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/comments');
      const reversedComments = response.data.reverse(); // Reverse the order of comments
      setComments(reversedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if newComment is empty
    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    try {
      await axios.post('http://localhost:5000/comments', {
        event_id: eventId,
        user_id: 1,
        content: newComment
      });
      fetchComments();
      setNewComment(''); 
      setEventId('');
      setError('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Event ID:
          <input type="text" value={eventId} onChange={handleEventIdChange} />
        </label>
        <br />
        <label>
          Comment:
          <input type="text" value={newComment} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Comment</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {comments.slice(0).reverse().map(comment => (
          <li key={comment.id}>
            <p>Content: {comment.content}</p>
            <p>Event ID: {comment.event_id}</p>
            <p>Created At: {comment.created_at}</p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
