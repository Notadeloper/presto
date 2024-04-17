import React from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { ErrorModal } from '../components/errorModal.jsx';

export function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const navigate = useNavigate();

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const navigateToLogin = () => {
    navigate('/login');
  }

  const register = async () => {
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match.');
      toggleModalError(!isModalErrorVisible);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/register', {
        email,
        password,
        name
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        register();
      }}>
        Email: <input type="text" onChange={e => setEmail(e.target.value)} value = {email} /> <br />
        Password: <input type="password" onChange={e => setPassword(e.target.value)} value = {password} /> <br />
        Confirm Password: <input type="password" onChange={e => setConfirmPassword(e.target.value)} value = {confirmPassword} /> <br/>
        Name: <input type="text" onChange={e => setName(e.target.value)} value = {name} /> <br />
        <button type ="submit" aria-label="register">Register</button>
        <button type ="button" onClick={navigateToLogin}>Already have an account? Log In</button>
      </form>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
