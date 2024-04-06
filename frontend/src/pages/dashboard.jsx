import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx'

export function Dashboard ({ token, setTokenFunction }) {
  const [store, setStore] = React.useState({});
  const [dummy1, setDummy1] = React.useState({});
  const [dummy2, setDummy2] = React.useState({});

  // axiosget is called everytime [] changes but also runs once at the start
  React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      setStore(response.data.store);
    })
  }, []);
  console.log(store, dummy1, dummy2);

  if (token === null) {
    return <Navigate to="/login" />
  }
  console.log(token);
  return <>
    <input type="text" onChange={e => setDummy1(e.target.value)} />
    <input type="text" onChange={e => setDummy2(e.target.value)} />
    <LogoutButton token={token} setToken={setTokenFunction}/> <br />
    dashboard
  </>;
}

// Note the two ways to use navigate
