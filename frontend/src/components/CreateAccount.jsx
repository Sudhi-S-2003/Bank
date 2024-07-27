import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

const CreateAccount = ({ token }) => {
  const [initialBalance, setInitialBalance] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setInitialBalance(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/accounts/create', { initialBalance }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Account created successfully!');
    } catch (err) {
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Create Account</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formInitialBalance">
              <Form.Label>Initial Balance</Form.Label>
              <Form.Control
                type="number"
                value={initialBalance}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateAccount;
