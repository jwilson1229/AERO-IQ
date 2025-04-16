import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';  
import DashboardPage from './pages/DashboardPage';  
import Signup from './pages/Signup';
import MyBets from './pages/myBets';
import Analytics from './pages/Analytics';
import { Auth } from './utils/auth';
import './App.css'

const isAuthenticated = () => {
  return !!Auth.getToken();  
};

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    
    setAuthenticated(isAuthenticated());
    
    
    const handleStorageChange = () => {
      setAuthenticated(isAuthenticated());
    };
    
  
    window.addEventListener('storage', handleStorageChange);
    
    
    const checkInterval = setInterval(() => {
      setAuthenticated(isAuthenticated());
    }, 1000); 
    
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
