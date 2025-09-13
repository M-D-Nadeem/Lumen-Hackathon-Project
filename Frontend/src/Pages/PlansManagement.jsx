import React, { useState } from 'react';
import PlanCard from '../Components/PlanCard';
import CreatePlanModal from '../Components/CreatePlanModal';
import EditPlanModal from '../Components/EditPlanModal';
import PlanStatsModal from '../Components/PlanStatsModal';
import TopPlansSection from '../Components/TopPlansSection';
import './PlansManagement.css';

const PlansManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Load plans from localStorage on component mount
  const [plans, setPlans] = useState(() => {
    const savedPlans = localStorage.getItem('subscriptionPlans');
    return savedPlans ? JSON.parse(savedPlans) : [];
  });

  // Save plans to localStorage whenever plans change
  React.useEffect(() => {
    localStorage.setItem('subscriptionPlans', JSON.stringify(plans));
  }, [plans]);

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper functions for performance summary
  const getMostPopularPlan = () => {
    if (plans.length === 0) return 'N/A';
    const mostPopular = plans.reduce((prev, current) => 
      (prev.users > current.users) ? prev : current
    );
    return `${mostPopular.name} Plan (${mostPopular.users} subscriptions)`;
  };

  const getHighestRevenuePlan = () => {
    if (plans.length === 0) return 'N/A';
    const highestRevenue = plans.reduce((prev, current) => 
      (prev.revenue > current.revenue) ? prev : current
    );
    return `${highestRevenue.name} Plan ($${highestRevenue.revenue.toLocaleString()}/month)`;
  };

  const getTotalUsers = () => {
    return plans.reduce((total, plan) => total + (plan.users || 0), 0);
  };

  const getTotalRevenue = () => {
    return plans.reduce((total, plan) => total + (plan.revenue || 0), 0);
  };

  // Time-based analytics functions
  const getTopPlansByTimeframe = (timeframe) => {
    const now = new Date();
    let startDate;
    
    switch (timeframe) {
      case 'recent':
        startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)); // Last 30 days
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Current month
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1); // Current year
        break;
      default:
        startDate = new Date(0);
    }

    return plans
      .filter(plan => {
        const planDate = new Date(plan.createdAt || plan.lastUpdated || Date.now());
        return planDate >= startDate;
      })
      .sort((a, b) => {
        // Sort by revenue first, then by users
        if (b.revenue !== a.revenue) {
          return (b.revenue || 0) - (a.revenue || 0);
        }
        return (b.users || 0) - (a.users || 0);
      })
      .slice(0, 5); // Top 5 plans
  };

  const getTopPlansRecent = () => getTopPlansByTimeframe('recent');
  const getTopPlansMonth = () => getTopPlansByTimeframe('month');
  const getTopPlansYear = () => getTopPlansByTimeframe('year');


  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all plans? This action cannot be undone.')) {
      setPlans([]);
    }
  };


  // Plan management functions
  const handleCreatePlan = (newPlan) => {
    setPlans((prev) => [...prev, newPlan]);
  };

  const handleUpdatePlan = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
    );
  };

  const handleDeletePlan = (planId) => {
    setPlans((prev) => prev.filter((plan) => plan.id !== planId));
  };

  const handleTogglePlanStatus = (planId) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? { ...plan, status: plan.status === 'active' ? 'inactive' : 'active' }
          : plan
      )
    );
  };

  // Modal handlers
  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setShowEditModal(true);
  };

  const handleViewStats = (plan) => {
    setSelectedPlan(plan);
    setShowStatsModal(true);
  };

  const handlePlanAction = (plan) => {
    if (plan.status === 'inactive') {
      if (
        window.confirm(
          `Are you sure you want to delete the ${plan.name} plan? This action cannot be undone.`
        )
      ) {
        handleDeletePlan(plan.id);
      }
    } else {
      if (
        window.confirm(
          `Are you sure you want to disable the ${plan.name} plan? Current subscribers will keep their access until their subscription expires.`
        )
      ) {
        handleTogglePlanStatus(plan.id);
      }
    }
  };

  return (
    <div className="plans-management">
      <div className="plans-header">
        <div className="plans-title-section">
          <h1 className="plans-title">💎 PLAN MANAGEMENT</h1>
          <button
            className="create-plan-btn"
            onClick={() => setShowCreateModal(true)}
          >
            + CREATE NEW PLAN
          </button>
        </div>

        <div className="plans-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="🔍 Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="bulk-actions-group">
            <button className="bulk-actions-btn">⚙️ Bulk Actions</button>
            <button className="clear-btn" onClick={clearAllData}>🗑️ Clear All</button>
          </div>
        </div>
      </div>

      <div className="plans-content">
        <div className="plans-list-header">
          <h2 className="list-title">📋 PLANS LIST</h2>
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>

        <div className={`plans-grid ${viewMode}`}>
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onEdit={handleEditPlan}
                onViewStats={handleViewStats}
                onAction={handlePlanAction}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No Plans Found</h3>
              <p>
                {searchTerm 
                  ? `No plans match "${searchTerm}". Try a different search term.`
                  : "You haven't created any plans yet. Click 'CREATE NEW PLAN' to get started."
                }
              </p>
              {!searchTerm && (
                <button 
                  className="create-first-plan-btn"
                  onClick={() => setShowCreateModal(true)}
                >
                  + Create Your First Plan
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Top Plans Analytics Section */}
      <TopPlansSection
        plans={plans}
        getTopPlansRecent={getTopPlansRecent}
        getTopPlansMonth={getTopPlansMonth}
        getTopPlansYear={getTopPlansYear}
      />

      <div className="performance-summary">
        <h3 className="summary-title">📊 PLAN PERFORMANCE SUMMARY</h3>
        <ul className="summary-list">
          {plans.length > 0 ? (
            <>
              <li>• Most Popular: {getMostPopularPlan()}</li>
              <li>• Highest Revenue: {getHighestRevenuePlan()}</li>
              <li>• Total Plans: {plans.length}</li>
              <li>• Total Users: {getTotalUsers()}</li>
              <li>• Total Revenue: ${getTotalRevenue().toLocaleString()}/month</li>
            </>
          ) : (
            <li>• No plans created yet. Create your first plan to see analytics.</li>
          )}
        </ul>
      </div>


      {/* Modals */}
      <CreatePlanModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePlan={handleCreatePlan}
      />

      <EditPlanModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdatePlan={handleUpdatePlan}
        plan={selectedPlan}
      />

      <PlanStatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        plan={selectedPlan}
      />
    </div>
  );
};

export default PlansManagement;
