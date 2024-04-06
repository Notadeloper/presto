import React from 'react';
import axios from 'axios';
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
    <>
      Email: <input type="text" onChange={e => setEmail(e.target.value)} value = {email} /> <br />
      Password: <input type="text" onChange={e => setPassword(e.target.value)} value = {password} /> <br />
      <button onClick={login}>Login</button>
    </>
  );
}
