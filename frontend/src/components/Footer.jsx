// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 p-4 text-center">
      <Container>
        <Row>
          <Col md="12">
            <p>&copy; {new Date().getFullYear()} Digital Payment. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
