import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login';  
import DashboardPage from '../pages/DashboardPage';  
import Signup from '../pages/Signup';
import MyBets from '../pages/myBets';
import Analytics from '../pages/Analytics';
import { Auth } from '../utils/auth';

const isAuthenticated = () => {
  return !!Auth.getToken();  
};

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    // Check authentication status on mount and after any change
    setAuthenticated(isAuthenticated());
    
    // Set up event listener for storage events (when token is added/removed)
    const handleStorageChange = () => {
      setAuthenticated(isAuthenticated());
    };
    
    // Set up a custom event listener for auth changes within the app
    window.addEventListener('storage', handleStorageChange);
    
    // Set up interval to periodically check auth status (as a fallback)
    const checkInterval = setInterval(() => {
      setAuthenticated(isAuthenticated());
    }, 1000); // Check every second
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Signup />} />
        <Route path='/myBets' element={<MyBets />}/>
        <Route path="/analytics" element={<Analytics />} />
        <Route
          path="/dashboard"
          element={authenticated ? <DashboardPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
