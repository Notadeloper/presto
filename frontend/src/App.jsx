import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login.jsx';
import { Register } from './pages/register.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  let lsToken = null;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(lsToken);

  const setTokenAbstract = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register token={token} setTokenFunction={setTokenAbstract}/>} />
          <Route path="/login" element={<Login token={token} setTokenFunction={setTokenAbstract}/>} />
          <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={setTokenAbstract}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
