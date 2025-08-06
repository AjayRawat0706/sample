import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Send, ArrowLeft, User, Phone, Video } from 'lucide-react';
import './Chat.css';

const Chat = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load other user data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.id === userId);
    setOtherUser(foundUser);

    // Load chat messages
    const chatKey = getChatKey(user.id, userId);
    const savedMessages = JSON.parse(localStorage.getItem(`chat_${chatKey}`) || '[]');
    setMessages(savedMessages);
  }, [userId, user.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getChatKey = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Save to localStorage
    const chatKey = getChatKey(user.id, userId);
    localStorage.setItem(`chat_${chatKey}`, JSON.stringify(updatedMessages));

    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  if (!otherUser) {
    return (
      <div className="chat-container">
        <div className="chat-loading">
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <div className="chat-user-info">
          <div className="chat-avatar">
            <User size={20} />
          </div>
          <div className="chat-user-details">
            <h3>{otherUser.name}</h3>
            <p>{otherUser.company}</p>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn">
            <Phone size={18} />
          </button>
          <button className="action-btn">
            <Video size={18} />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {Object.keys(messageGroups).length === 0 ? (
          <div className="chat-empty">
            <div className="empty-avatar">
              <User size={48} />
            </div>
            <h3>Start a conversation with {otherUser.name}</h3>
            <p>Send a message to begin networking and discussing opportunities.</p>
          </div>
        ) : (
          Object.entries(messageGroups).map(([date, dayMessages]) => (
            <div key={date} className="message-group">
              <div className="date-separator">
                <span>{formatDate(dayMessages[0].timestamp)}</span>
              </div>
              {dayMessages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === user.id ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{message.content}</p>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${otherUser.name}...`}
            className="message-input"
          />
          <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;