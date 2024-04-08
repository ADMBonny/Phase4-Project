import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentCrud() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    try {
      await axios.post('http://localhost:5000/comments', {
        content: newComment
      });
      fetchComments(); // Fetch updated comments after adding a new one
      setNewComment('');
      setError('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`);
      fetchComments(); // Fetch updated comments after deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input type="text" value={newComment} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Comment</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>Content: {comment.content}</p>
            <p>Created At: {comment.created_at}</p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentCrud;
