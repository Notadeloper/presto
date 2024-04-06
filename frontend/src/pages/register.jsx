import React from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

export function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/register', {
        email,
        password,
        name
      });
      setTokenFunction(response.data.token);
      console.log(response);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  return (
    <>
      Email: <input type="text" onChange={e => setEmail(e.target.value)} value = {email} /> <br />
      Password: <input type="text" onChange={e => setPassword(e.target.value)} value = {password} /> <br />
      Name: <input type="text" onChange={e => setName(e.target.value)} value = {name} /> <br />
      <button onClick={register}>Register</button>
    </>
  );
}
