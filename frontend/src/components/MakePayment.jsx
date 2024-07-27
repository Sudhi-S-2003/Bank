// src/components/Payment.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Payment = ({ token }) => {
  const { id } = useParams();
  const [amount, setAmount] = useState('');

  const handleChange = (e) => setAmount(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/accounts/payment', { id, amount }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Payment successful!');
      setAmount(''); // Clear the input field after success
    } catch (err) {
      toast.error('Failed to process payment');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Make a Payment</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Make Payment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Payment;
