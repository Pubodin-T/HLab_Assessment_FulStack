import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './components/UserProfile';
import '@testing-library/jest-dom';

// Mock ฟังก์ชัน fetch
global.fetch = jest.fn();

describe('UserProfile Component', () => {
  const mockUser = { name: 'Pubodin', email: 'pubodin.tie@gmail.com' };

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      })
    );
  });

  test('renders loading initially', () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays user data upon successful fetch', async () => {
    render(<UserProfile userId="123" />);
    await waitFor(() => screen.getByText(mockUser.name));
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    render(<UserProfile userId="123" />);
    fetch.mockClear();
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    }, { timeout: 1000 }); // Increase timeout to 5 seconds

    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });
});