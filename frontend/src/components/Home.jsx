// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-4">
      {/* Hero Section */}
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h1 className="display-4">Welcome to Digital Payment</h1>
          <p className="lead">Manage your finances easily and securely with our digital payment platform.</p>
          <Button variant="primary" size="lg" as={Link} to="/register">
            Get Started
          </Button>
        </Col>
        <Col md={6}>
          <img src="https://via.placeholder.com/500" alt="Digital Payment" className="img-fluid" />
        </Col>
      </Row>
      
      {/* Features Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Easy Transactions</Card.Title>
              <Card.Text>Transfer money quickly and securely to your friends and family.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Secure Payments</Card.Title>
              <Card.Text>Your financial data is protected with top-notch security measures.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>24/7 Support</Card.Title>
              <Card.Text>Our support team is here to help you anytime, anywhere.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
