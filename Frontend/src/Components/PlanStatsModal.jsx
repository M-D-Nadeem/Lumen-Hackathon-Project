import React from 'react';
import './PlanStatsModal.css';

const PlanStatsModal = ({ isOpen, onClose, plan }) => {
  if (!isOpen || !plan) return null;

  // Calculate some mock analytics data based on the plan
  const monthlyGrowth = Math.floor(Math.random() * 20) + 5; // 5-25%
  const conversionRate = (Math.random() * 5 + 2).toFixed(1); // 2-7%
  const churnRate = (Math.random() * 3 + 0.5).toFixed(1); // 0.5-3.5%
  const avgRevenuePerUser =
    plan.users > 0 ? (plan.revenue / plan.users).toFixed(2) : '0.00';

  // Mock monthly data for the last 6 months
  const monthlyData = [
    { month: 'Jan', users: Math.floor(plan.users * 0.7), revenue: Math.floor(plan.revenue * 0.7) },
    { month: 'Feb', users: Math.floor(plan.users * 0.75), revenue: Math.floor(plan.revenue * 0.75) },
    { month: 'Mar', users: Math.floor(plan.users * 0.85), revenue: Math.floor(plan.revenue * 0.85) },
    { month: 'Apr', users: Math.floor(plan.users * 0.9), revenue: Math.floor(plan.revenue * 0.9) },
    { month: 'May', users: Math.floor(plan.users * 0.95), revenue: Math.floor(plan.revenue * 0.95) },
    { month: 'Jun', users: plan.users, revenue: plan.revenue }
  ];

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="stats-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📊 {plan.name} Plan Statistics</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
        
        <div className="stats-content">
          {/* Key Metrics */}
          <div className="stats-section">
            <h3>📈 Key Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">👥</div>
                <div className="metric-info">
                  <div className="metric-value">{plan.users.toLocaleString()}</div>
                  <div className="metric-label">Total Users</div>
                  <div className="metric-change positive">+{monthlyGrowth}% this month</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">💰</div>
                <div className="metric-info">
                  <div className="metric-value">${plan.revenue.toLocaleString()}</div>
                  <div className="metric-label">Monthly Revenue</div>
                  <div className="metric-change positive">+{(monthlyGrowth - 2)}% this month</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">📊</div>
                <div className="metric-info">
                  <div className="metric-value">${avgRevenuePerUser}</div>
                  <div className="metric-label">ARPU</div>
                  <div className="metric-description">Avg Revenue Per User</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">🎯</div>
                <div className="metric-info">
                  <div className="metric-value">{conversionRate}%</div>
                  <div className="metric-label">Conversion Rate</div>
                  <div className="metric-description">Trial to Paid</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Indicators */}
          <div className="stats-section">
            <h3>⚡ Performance Indicators</h3>
            <div className="performance-grid">
              <div className="performance-item">
                <div className="performance-label">Churn Rate</div>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: `${parseFloat(churnRate) * 10}%` }}></div>
                </div>
                <div className="performance-value">{churnRate}%</div>
              </div>
              
              <div className="performance-item">
                <div className="performance-label">Market Share</div>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: `${Math.min(plan.users / 10, 100)}%` }}></div>
                </div>
                <div className="performance-value">{Math.min(Math.floor(plan.users / 10), 100)}%</div>
              </div>
              
              <div className="performance-item">
                <div className="performance-label">User Satisfaction</div>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: '87%' }}></div>
                </div>
                <div className="performance-value">87%</div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="stats-section">
            <h3>📅 6-Month Trend</h3>
            <div className="trend-chart">
              <div className="chart-header">
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color users"></div>
                    <span>Users</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color revenue"></div>
                    <span>Revenue ($K)</span>
                  </div>
                </div>
              </div>
              
              <div className="chart-container">
                {monthlyData.map((data) => (
                  <div key={data.month} className="chart-bar-group">
                    <div className="chart-bars">
                      <div 
                        className="chart-bar users" 
                        style={{ height: `${(data.users / plan.users) * 100}%` }}
                        title={`${data.users} users`}
                      ></div>
                      <div 
                        className="chart-bar revenue" 
                        style={{ height: `${(data.revenue / plan.revenue) * 100}%` }}
                        title={`$${(data.revenue / 1000).toFixed(1)}K revenue`}
                      ></div>
                    </div>
                    <div className="chart-label">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan Status */}
          <div className="stats-section">
            <h3>ℹ️ Plan Information</h3>
            <div className="plan-info-grid">
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className={`info-value status ${plan.status}`}>
                  {plan.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Price:</span>
                <span className="info-value">${plan.price}/{plan.period}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Plan Color:</span>
                <span className="info-value">
                  <div className="color-preview" style={{ backgroundColor: plan.color }}></div>
                  {plan.color}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Created:</span>
                <span className="info-value">6 months ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanStatsModal;
