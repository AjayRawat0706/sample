import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Building, TrendingUp, MessageCircle, Star, Filter, Eye } from 'lucide-react';
import './Dashboard.css';

const InvestorDashboard = () => {
  const { user } = useAuth();
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    // Load founders from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const founderUsers = users.filter(u => u.role === 'founder');
    setStartups(founderUsers);
  }, []);

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleInvest = (startupId) => {
    // In a real app, this would initiate investment process
    alert('Investment interest sent!');
  };

  const handleMessage = (startupId) => {
    // Navigate to chat
    window.location.href = `/chat/${startupId}`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name}!</h1>
            <p>Discover promising startups to invest in</p>
          </div>
          <div className="stats-cards">
            <div className="stat-card">
              <Building className="stat-icon" />
              <div>
                <h3>24</h3>
                <p>Portfolio Companies</p>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp className="stat-icon" />
              <div>
                <h3>$2.5M</h3>
                <p>Total Invested</p>
              </div>
            </div>
            <div className="stat-card">
              <Star className="stat-icon" />
              <div>
                <h3>4.9</h3>
                <p>Investor Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <h2>Investment Profile</h2>
            <div className="profile-content">
              <div className="profile-info">
                <h3>{user?.company}</h3>
                <p className="profile-description">{user?.description}</p>
                <div className="profile-tags">
                  <span className="tag">Early Stage</span>
                  <span className="tag">Technology</span>
                  <span className="tag">$50K - $500K</span>
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
              placeholder="Search startups by name, industry, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-section">
            <Filter size={20} />
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="all">All Startups</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="fintech">FinTech</option>
              <option value="ecommerce">E-commerce</option>
            </select>
          </div>
        </div>

        {/* Startups Grid */}
        <div className="startups-section">
          <h2>Discover Startups</h2>
          <div className="startups-grid">
            {filteredStartups.map(startup => (
              <div key={startup.id} className="startup-card">
                <div className="startup-header">
                  <div className="startup-avatar">
                    <Building size={24} />
                  </div>
                  <div className="startup-info">
                    <h3>{startup.company}</h3>
                    <p className="startup-founder">Founded by {startup.name}</p>
                  </div>
                  <div className="startup-stage">
                    <span className="stage-badge">Series A</span>
                  </div>
                </div>
                <div className="startup-description">
                  <p>{startup.description}</p>
                </div>
                <div className="startup-metrics">
                  <div className="metric">
                    <span className="metric-label">Valuation</span>
                    <span className="metric-value">$5M</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Seeking</span>
                    <span className="metric-value">$1M</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Traction</span>
                    <span className="metric-value">10K users</span>
                  </div>
                </div>
                <div className="startup-tags">
                  <span className="startup-tag">SaaS</span>
                  <span className="startup-tag">B2B</span>
                  <span className="startup-tag">AI</span>
                </div>
                <div className="startup-actions">
                  <button 
                    className="invest-btn"
                    onClick={() => handleInvest(startup.id)}
                  >
                    <TrendingUp size={18} />
                    Invest
                  </button>
                  <button 
                    className="view-btn"
                    onClick={() => alert('View full profile')}
                  >
                    <Eye size={18} />
                    View
                  </button>
                  <button 
                    className="message-btn"
                    onClick={() => handleMessage(startup.id)}
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

export default InvestorDashboard;