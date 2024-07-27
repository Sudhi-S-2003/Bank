import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const AddMoney = ({ token }) => {
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
      const res = await axios.post('http://localhost:5000/api/accounts/add-money', { id, amount }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Money added successfully!');
      setAmount(''); // Clear the input field after success
    } catch (err) {
      toast.error('Failed to add money');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Add Money</Card.Header>
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
              Add Money
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddMoney;
