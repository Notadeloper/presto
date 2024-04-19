import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login.jsx';
import { Register } from './pages/register.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { Presentation } from './pages/presentation.jsx';
import { Preview } from './pages/preview.jsx';
import { Rearranger } from './pages/rearranger.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/style.jsx';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/register" />} />
            <Route path="/register" element={<Register token={token} setTokenFunction={setTokenAbstract}/>} />
            <Route path="/login" element={<Login token={token} setTokenFunction={setTokenAbstract}/>} />
            <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={setTokenAbstract}/>} />
            <Route path="/presentations/:presentationId/:urlSlideIndex" element={<Presentation token={token} setTokenFunction={setTokenAbstract}/>}/>
            <Route path="/presentations/:presentationId/:urlSlideIndex/preview/" element={<Preview token={token} setTokenFunction={setTokenAbstract}/>}/>
            <Route path="/presentations-rearrange/:presentationId" element={<Rearranger token={token} setTokenFunction={setTokenAbstract}/>}/>
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
