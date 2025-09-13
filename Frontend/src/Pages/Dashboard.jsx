import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // In a real app, this would come from props or context
  // For now, we'll show placeholder data that encourages admin action
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <span className="header-icon">📊</span>
            <h1>Dashboard</h1>
          </div>
          <p>Welcome to the Subscription Management Admin Panel</p>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Plans</h3>
          <div className="card-value">0</div>
          <div className="card-change">Create your first plan</div>
        </div>
        
        <div className="dashboard-card">
          <h3>Active Subscriptions</h3>
          <div className="card-value">0</div>
          <div className="card-change">No subscriptions yet</div>
        </div>
        
        <div className="dashboard-card">
          <h3>Monthly Revenue</h3>
          <div className="card-value">$0</div>
          <div className="card-change">Start earning</div>
        </div>
        
        <div className="dashboard-card">
          <h3>Churn Rate</h3>
          <div className="card-value">0%</div>
          <div className="card-change">No data available</div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Getting Started</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">💎</span>
            <span className="activity-text">Create your first subscription plan</span>
            <span className="activity-time">Click "Plans" tab</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">👥</span>
            <span className="activity-text">Set up user management</span>
            <span className="activity-time">Click "Users" tab</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📊</span>
            <span className="activity-text">View analytics and reports</span>
            <span className="activity-time">Click "Analytics" tab</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
