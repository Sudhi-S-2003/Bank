import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = ({ token, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Digital Payment</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {token ? (
            <>
              <Nav.Link as={Link} to="/account">Account</Nav.Link>
              <Nav.Link as={Link} to="/add-money">Add Money</Nav.Link>
              <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
              <Nav.Link as={Link} to="/create-account">Create Account</Nav.Link>
              <Nav.Link as={Link} to="/make-payment">Make Payment</Nav.Link>
              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;