import React from 'react';
import './PlanCard.css';

const PlanCard = ({ plan, onEdit, onViewStats, onAction }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? '🟢' : '🔴';
  };

  const handleEdit = () => {
    onEdit(plan);
  };

  const handleStats = () => {
    onViewStats(plan);
  };

  const handleAction = () => {
    onAction(plan);
  };

  return (
    <div className="plan-card" data-status={plan.status}>
      <div className="plan-header">
        <div className="plan-status">
          {getStatusIcon(plan.status)}
          <span className="plan-name">{plan.name}</span>
        </div>
      </div>
      
      <div className="plan-pricing">
        <span className="plan-price">
          {formatCurrency(plan.price)}/{plan.period}
        </span>
      </div>

      <div className="plan-stats">
        <div className="stat-item">
          <span className="stat-value">{plan.users} users</span>
        </div>
        <div className="stat-item">
          <span className="stat-revenue">{formatCurrency(plan.revenue)}</span>
        </div>
      </div>

      <div className="plan-actions">
        <button className="action-btn edit-btn" onClick={handleEdit}>
          ✏️ Edit
        </button>
        <button className="action-btn stats-btn" onClick={handleStats}>
          📊 Stats
        </button>
        <button 
          className={`action-btn ${plan.status === 'active' ? 'disable-btn' : 'delete-btn'}`}
          onClick={handleAction}
        >
          {plan.status === 'active' ? '⚠️ Disable' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
