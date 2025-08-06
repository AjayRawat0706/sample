import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import FounderDashboard from './components/Dashboard/FounderDashboard';
import InvestorDashboard from './components/Dashboard/InvestorDashboard';
import Chat from './components/Chat/Chat';
import Navbar from './components/Layout/Navbar';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              user.role === 'founder' ? <FounderDashboard /> : <InvestorDashboard />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/chat/:userId" 
          element={user ? <Chat /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
