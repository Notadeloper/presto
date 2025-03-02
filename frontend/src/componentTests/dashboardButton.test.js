import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { DashboardButton } from '../components/DashboardButton';
import * as reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DashboardButton', () => {
  it('navigates to the dashboard when clicked', () => {
    const mockNavigate = jest.fn();
    reactRouterDom.useNavigate.mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <DashboardButton token="dummy-token" setToken={() => {}} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /dashboard/i });
    userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});