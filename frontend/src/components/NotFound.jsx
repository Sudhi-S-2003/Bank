// src/components/Notfound.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Notfound = () => {
  return (
    <Container className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Container>
  );
};

export default Notfound;
