import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './login.jsx'
import { Register } from './register.jsx'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
