import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login.jsx';
import { Register } from './pages/register.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  /* const updateStore = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      if (!currentStore.presentations) {
        currentStore.presentations = [];
      }

      console.log(currentStore);
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      alert(err);
    }
  } */

  let lsToken = null;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(lsToken);

  const setTokenAbstract = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  updateStore();

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
