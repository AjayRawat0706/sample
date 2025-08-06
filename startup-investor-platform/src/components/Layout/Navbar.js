import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, MessageCircle, User, Search, Home } from 'lucide-react';
import './Layout.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Home size={24} />
          <span>StartupConnect</span>
        </div>

        <div className="navbar-center">
          <div className="nav-links">
            <a href="/dashboard" className="nav-link">
              <Search size={18} />
              {user?.role === 'founder' ? 'Find Investors' : 'Discover Startups'}
            </a>
            <a href="#" className="nav-link">
              <MessageCircle size={18} />
              Messages
            </a>
          </div>
        </div>

        <div className="navbar-right">
          <div className="user-info">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;