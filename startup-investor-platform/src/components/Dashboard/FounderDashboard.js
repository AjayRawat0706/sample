import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, DollarSign, Building, MapPin, MessageCircle, Star, Filter } from 'lucide-react';
import './Dashboard.css';

const FounderDashboard = () => {
  const { user } = useAuth();
  const [investors, setInvestors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    // Load investors from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const investorUsers = users.filter(u => u.role === 'investor');
    setInvestors(investorUsers);
  }, []);

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleConnect = (investorId) => {
    // In a real app, this would send a connection request
    alert('Connection request sent!');
  };

  const handleMessage = (investorId) => {
    // Navigate to chat
    window.location.href = `/chat/${investorId}`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name}!</h1>
            <p>Find the perfect investors for your startup</p>
          </div>
          <div className="stats-cards">
            <div className="stat-card">
              <Building className="stat-icon" />
              <div>
                <h3>{user?.company}</h3>
                <p>Your Startup</p>
              </div>
            </div>
            <div className="stat-card">
              <MessageCircle className="stat-icon" />
              <div>
                <h3>12</h3>
                <p>Connections</p>
              </div>
            </div>
            <div className="stat-card">
              <Star className="stat-icon" />
              <div>
                <h3>4.8</h3>
                <p>Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <h2>Your Startup Profile</h2>
            <div className="profile-content">
              <div className="profile-info">
                <h3>{user?.company}</h3>
                <p className="profile-description">{user?.description}</p>
                <div className="profile-tags">
                  <span className="tag">Technology</span>
                  <span className="tag">Series A</span>
                  <span className="tag">B2B</span>
                </div>
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search investors by name, company, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-section">
            <Filter size={20} />
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="all">All Investors</option>
              <option value="early">Early Stage</option>
              <option value="growth">Growth Stage</option>
              <option value="venture">Venture Capital</option>
            </select>
          </div>
        </div>

        {/* Investors Grid */}
        <div className="investors-section">
          <h2>Discover Investors</h2>
          <div className="investors-grid">
            {filteredInvestors.map(investor => (
              <div key={investor.id} className="investor-card">
                <div className="investor-header">
                  <div className="investor-avatar">
                    <DollarSign size={24} />
                  </div>
                  <div className="investor-info">
                    <h3>{investor.name}</h3>
                    <p className="investor-company">{investor.company}</p>
                  </div>
                </div>
                <div className="investor-description">
                  <p>{investor.description}</p>
                </div>
                <div className="investor-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="detail-item">
                    <Building size={16} />
                    <span>Tech Focus</span>
                  </div>
                </div>
                <div className="investor-tags">
                  <span className="investor-tag">SaaS</span>
                  <span className="investor-tag">FinTech</span>
                  <span className="investor-tag">AI/ML</span>
                </div>
                <div className="investor-actions">
                  <button 
                    className="connect-btn"
                    onClick={() => handleConnect(investor.id)}
                  >
                    Connect
                  </button>
                  <button 
                    className="message-btn"
                    onClick={() => handleMessage(investor.id)}
                  >
                    <MessageCircle size={18} />
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;