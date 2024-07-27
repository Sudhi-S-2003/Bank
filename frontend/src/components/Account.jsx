import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Account = ({ token }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch account information
  const fetchAccountInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/accounts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAccounts(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setAccounts([]);
      } else {
        toast.error('Failed to fetch account info');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    fetchAccountInfo();
  }, [token]);

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Display loading message while data is being fetched
  if (loading) {
    return <Container className="mt-4"><p>Loading...</p></Container>;
  }

  const handleDelete = async (accountId) => {
    try {
      await axios.delete(`http://localhost:5000/api/accounts/delete/${accountId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Account deleted successfully');
      // Refresh account details
      fetchAccountInfo();
    } catch (err) {
      toast.error('Failed to delete account');
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Button variant="primary" as={Link} to={`/create-account`}>
            Create New Account
          </Button>
        </Col>
      </Row>
      <h2 className='text-center'>Account List</h2>
      {accounts.length > 0 ? (
        <Card>
          <Card.Header as="h5">Account Details</Card.Header>
          {accounts.map((account) => (
            <Card.Body key={account._id}>
              <Card.Title>Balance: ${account.balance.toFixed(2)}</Card.Title>
              <Card.Text>
                Account Number: {account.accountNumber}
              </Card.Text>
              <Row>
                <Col>
                  <Button variant="primary" as={Link} to={`/add-money/${account._id}`}>
                    Add Money
                  </Button>
                </Col>
                
                <Col>
                  <Button variant="secondary" as={Link} to={`/transactions/${account._id}`}>
                    View Transactions
                  </Button>
                </Col>
                <Col>
                  <Button variant="danger" onClick={() => handleDelete(account._id)}>
                    Delete Account
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          ))}
        </Card>
      ) : (
        <Card>
          <Card.Header as="h5">No Account Found</Card.Header>
          <Card.Body>
            <p>You don't have any accounts yet. Please create one to manage your balance and transactions.</p>
            <Button variant="primary" as={Link} to="/create-account">
              Create Account
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Account;
