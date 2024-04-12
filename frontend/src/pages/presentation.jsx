import React from 'react';
import { useParams } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { DashboardButton } from '../components/dashboardButton.jsx';

export function Presentation ({ token, setTokenFunction }) {
  const { presentationId } = useParams();
  return (
    <>
      {presentationId}
      <LogoutButton token={token} setToken={setTokenFunction}/>
      <DashboardButton/>
    </>
  )
}
