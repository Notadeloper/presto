import React from 'react';
import axios from 'axios';

export function LogoutButton ({ token, setToken }) {
  const logout = async () => {
    try {
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          Authorization: token,
        }
      });
      setToken(null);
      localStorage.removeItem('token');
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  return (
    <button onClick={logout}>Logout</button>
  );
}
