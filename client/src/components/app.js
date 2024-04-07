import React from 'react';
import { Container } from 'react-bootstrap';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Container>
      <h1>Welcome to the App</h1>
      <Login />
      <Signup />
    </Container>
  );
}

export default App;
