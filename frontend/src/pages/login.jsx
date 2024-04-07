import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/style.css'
import { useNavigate, Navigate } from 'react-router-dom';

export function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password,
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  return (
    <div className="this-is-a-div-wrapper">
      <Form onSubmit={(e) => {
        e.preventDefault();
        login();
      }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value = {email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value = {password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
