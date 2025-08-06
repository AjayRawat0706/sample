import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Mail, Lock, User, Building, DollarSign, AlertCircle } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    company: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.role) {
      setError('Please select your role');
      setLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists');
        setLoading(false);
        return;
      }

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        company: formData.company,
        description: formData.description
      };

      register(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <UserPlus className="auth-icon" />
          <h1>Join Our Platform</h1>
          <p>Connect founders with investors</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selection">
              <div className="role-option">
                <input
                  type="radio"
                  id="founder"
                  name="role"
                  value="founder"
                  checked={formData.role === 'founder'}
                  onChange={handleChange}
                />
                <label htmlFor="founder" className="role-label">
                  <Building size={24} />
                  <span>Startup Founder</span>
                  <p>Looking for investment and mentorship</p>
                </label>
              </div>
              <div className="role-option">
                <input
                  type="radio"
                  id="investor"
                  name="role"
                  value="investor"
                  checked={formData.role === 'investor'}
                  onChange={handleChange}
                />
                <label htmlFor="investor" className="role-label">
                  <DollarSign size={24} />
                  <span>Investor</span>
                  <p>Looking to invest in promising startups</p>
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="company">
              {formData.role === 'founder' ? 'Startup Name' : 'Company/Fund Name'}
            </label>
            <div className="input-group">
              <Building className="input-icon" size={20} />
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={formData.role === 'founder' ? 'Enter your startup name' : 'Enter your company/fund name'}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={
                formData.role === 'founder' 
                  ? 'Describe your startup and what you\'re building...'
                  : 'Describe your investment focus and criteria...'
              }
              rows="3"
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;