// src/components/FormComponent.js
import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';

const FormComponent = ({ type, setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = type === 'register' ? 'http://localhost:5000/api/users/register' : 'http://localhost:5000/api/users/login';
      const res = await axios.post(url, formData);
      if (type === 'login') {
        const token = res.data.token;
        setToken(token); // Update token in parent component
        localStorage.setItem('token', token); // Store token in localStorage
        toast.success('Login successful!');
      } else {
        toast.success('Registration successful! Please login.');
      }
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">{type === 'register' ? 'Register' : 'Login'}</Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            {type === 'register' && (
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={username} onChange={onChange} required />
              </Form.Group>
            )}
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={onChange} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={password} onChange={onChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              {type === 'register' ? 'Register' : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormComponent;
