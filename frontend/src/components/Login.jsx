// src/components/Login.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormComponent from './Form';

const Login = ({ token, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/account');
    }
  }, [token, navigate]);

  return <FormComponent type="login" setToken={setToken} />;
};

export default Login;
