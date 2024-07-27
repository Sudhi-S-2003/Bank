// src/components/Transaction.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const Transaction = ({ token }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/transactions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTransactions(res.data);
      } catch (err) {
        toast.error('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // Display loading message while data is being fetched
  if (loading) {
    return <Container className="mt-4"><p>Loading...</p></Container>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Transaction History</Card.Header>
        <Card.Body>
          {transactions.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Sender</th>
                  <th>Recipient</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.senderName || 'Unknown'}</td>
                    <td>{transaction.recipientName || 'Unknown'}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No transactions found.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Transaction;
