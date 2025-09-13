import React, { useState } from 'react';
import './TopPlansSection.css';

const TopPlansSection = ({ plans, getTopPlansRecent, getTopPlansMonth, getTopPlansYear }) => {
  const [activeTab, setActiveTab] = useState('recent');

  const timeframes = [
    { key: 'recent', label: 'Recent (30 days)', icon: '🔥' },
    { key: 'month', label: 'This Month', icon: '📅' },
    { key: 'year', label: 'This Year', icon: '📊' }
  ];

  const getTopPlans = () => {
    switch (activeTab) {
      case 'recent':
        return getTopPlansRecent();
      case 'month':
        return getTopPlansMonth();
      case 'year':
        return getTopPlansYear();
      default:
        return [];
    }
  };

  const topPlans = getTopPlans();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRankIcon = (index) => {
    const icons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    return icons[index] || '🏆';
  };

  const getPerformanceColor = (index) => {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#4A90E2', '#7B68EE'];
    return colors[index] || '#6C757D';
  };

  return (
    <div className="top-plans-section">
      <div className="top-plans-header">
        <h3 className="top-plans-title">🏆 TOP PERFORMING PLANS</h3>
        <div className="timeframe-tabs">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.key}
              className={`timeframe-tab ${activeTab === timeframe.key ? 'active' : ''}`}
              onClick={() => setActiveTab(timeframe.key)}
            >
              <span className="tab-icon">{timeframe.icon}</span>
              <span className="tab-label">{timeframe.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="top-plans-content">
        {topPlans.length > 0 ? (
          <div className="top-plans-list">
            {topPlans.map((plan, index) => (
              <div
                key={plan.id}
                className="top-plan-card"
                style={{ borderLeftColor: getPerformanceColor(index) }}
              >
                <div className="plan-rank">
                  <span className="rank-icon">{getRankIcon(index)}</span>
                  <span className="rank-number">#{index + 1}</span>
                </div>
                
                <div className="plan-info">
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-description">{plan.description || 'No description available'}</div>
                  <div className="plan-metrics">
                    <div className="metric">
                      <span className="metric-label">Revenue:</span>
                      <span className="metric-value revenue">{formatCurrency(plan.revenue || 0)}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Users:</span>
                      <span className="metric-value users">{plan.users || 0}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Price:</span>
                      <span className="metric-value price">{formatCurrency(plan.price || 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="plan-status">
                  <span className={`status-badge ${plan.status || 'active'}`}>
                    {plan.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-top-plans">
            <div className="no-plans-icon">📈</div>
            <h4>No Plans Found</h4>
            <p>
              {activeTab === 'recent' && "No plans created in the last 30 days."}
              {activeTab === 'month' && "No plans created this month."}
              {activeTab === 'year' && "No plans created this year."}
            </p>
          </div>
        )}
      </div>

      {topPlans.length > 0 && (
        <div className="top-plans-summary">
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-label">Total Revenue:</span>
              <span className="stat-value">
                {formatCurrency(topPlans.reduce((sum, plan) => sum + (plan.revenue || 0), 0))}
              </span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Total Users:</span>
              <span className="stat-value">
                {topPlans.reduce((sum, plan) => sum + (plan.users || 0), 0)}
              </span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Avg. Price:</span>
              <span className="stat-value">
                {formatCurrency(
                  topPlans.reduce((sum, plan) => sum + (plan.price || 0), 0) / topPlans.length
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPlansSection;
