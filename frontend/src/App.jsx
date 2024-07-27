// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import AddMoney from './components/AddMoney';
import Transactions from './components/Transactions'; // Ensure correct path
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Notfound from './components/NotFound';
import { Toaster } from 'react-hot-toast';
import CreateAccount from './components/CreateAccount';
import MakePayment from './components/MakePayment';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleSetToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <AppNavbar token={token} handleLogout={handleLogout} />
      <Container className="mt-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login token={token} setToken={handleSetToken} />} />
          {token ? (
            <>
              <Route path="/account" element={<Account token={token} />} />
              <Route path="/add-money/:id" element={<AddMoney token={token} />} />
              <Route path="/transactions/:id" element={<Transactions token={token} />} />
              <Route path="/create-account" element={<CreateAccount token={token} />} />
              <Route path="/make-payment/:id" element={<MakePayment token={token} />} />
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <Route path="/" element={<Home />} />
          )}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Container>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
