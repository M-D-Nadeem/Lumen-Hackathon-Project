import React, { useState, useEffect } from 'react';
// import Navigation from '../Components/Navigation';
import { api } from '../services/api';

// Simple SVG Icons
const BellIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ChartBarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CreditCardIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const QuestionMarkCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SubscriptionDashboard = () => {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOldPlans, setShowOldPlans] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showNewSubscriptionModal, setShowNewSubscriptionModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using static user ID
        const userId = '68c51bb6fb2ab04ca431c1d1';
        
        const [userResponse, subscriptionsResponse, productsResponse] = await Promise.all([
          api.getUser(userId),
          api.getSubscriptionsByUser(userId),
          api.getProducts()
        ]);

        setUser(userResponse.data);
        setSubscriptions(subscriptionsResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set demo data if API fails
        setUser({
          id: '68c51bb6fb2ab04ca431c1d1',
          userName: 'John Doe',
          email: 'john.doe@example.com',
          status: 'active'
        });
        setSubscriptions([
          {
            _id: '1',
            userId: '68c51bb6fb2ab04ca431c1d1',
            planId: { _id: '1', name: 'Basic Plan', price: 29.99, billingCycle: 'monthly', category: 'basic' },
            status: 'active',
            startDate: '2024-01-01',
            endDate: '2024-02-01',
            pricing: { originalPrice: 29.99, discountApplied: 0, finalPrice: 29.99 }
          }
        ]);
        setProducts([
          { _id: '1', name: 'Basic Plan', price: 29.99, billingCycle: 'monthly', category: 'basic', isActive: true },
          { _id: '2', name: 'Premium Plan', price: 49.99, billingCycle: 'monthly', category: 'premium', isActive: true },
          { _id: '3', name: 'Enterprise Plan', price: 99.99, billingCycle: 'yearly', category: 'premium', isActive: true }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const pausedSubscriptions = subscriptions.filter(sub => sub.status === 'paused');
  const terminatedSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled' || sub.status === 'expired');

  const handleNewSubscription = async (planId, billingCycle) => {
    try {
      const newSubscription = {
        userId: '68c51bb6fb2ab04ca431c1d1',
        planId: planId,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
        pricing: {
          originalPrice: products.find(p => p._id === planId)?.price || 0,
          discountApplied: 0,
          finalPrice: products.find(p => p._id === planId)?.price || 0
        }
      };
      
      const createdSubscription = await api.createSubscription(newSubscription);
      setSubscriptions(prev => [...prev, createdSubscription.data]);
      setShowNewSubscriptionModal(false);
      alert('New subscription created successfully!');
      
      // Reload the page to refresh all data
      window.location.reload();
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Error creating subscription');
    }
  };

  const handleUpgradePlan = (subscription) => {
    setSelectedSubscription(subscription);
    setShowUpgradeModal(true);
  };

  const handleUpgradeToPlan = async (newPlanId) => {
    try {
      const updatedSubscription = {
        planId: newPlanId,
        pricing: {
          originalPrice: products.find(p => p._id === newPlanId)?.price || 0,
          discountApplied: selectedSubscription.pricing?.discountApplied || 0,
          finalPrice: (products.find(p => p._id === newPlanId)?.price || 0) - (selectedSubscription.pricing?.discountApplied || 0)
        }
      };
      
      await api.updateSubscription(selectedSubscription._id, updatedSubscription);
      
      // Update local state
      setSubscriptions(prev => 
        prev.map(sub => 
          sub._id === selectedSubscription._id 
            ? { 
                ...sub, 
                planId: products.find(p => p._id === newPlanId),
                pricing: updatedSubscription.pricing
              }
            : sub
        )
      );
      
      setShowUpgradeModal(false);
      setSelectedSubscription(null);
      alert('Subscription updated successfully!');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Error updating subscription');
    }
  };

  const handleWindUpPlan = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to wind up this plan?')) {
      try {
        await api.pauseSubscription(subscriptionId);
        setSubscriptions(prev => 
          prev.map(sub => 
            sub._id === subscriptionId 
              ? { ...sub, status: 'paused' }
              : sub
          )
        );
        alert('Plan has been wound up successfully');
      } catch (error) {
        console.error('Error winding up plan:', error);
        alert('Error winding up plan');
      }
    }
  };

  const handleCancelPlan = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this plan? This action cannot be undone.')) {
      try {
        await api.cancelSubscription(subscriptionId, 'User requested cancellation');
        setSubscriptions(prev => 
          prev.map(sub => 
            sub._id === subscriptionId 
              ? { ...sub, status: 'cancelled', endDate: new Date() }
              : sub
          )
        );
        alert('Plan has been cancelled successfully');
      } catch (error) {
        console.error('Error cancelling plan:', error);
        alert('Error cancelling plan');
      }
    }
  };

  const handleResumePlan = async (subscriptionId) => {
    try {
      await api.resumeSubscription(subscriptionId);
      setSubscriptions(prev => 
        prev.map(sub => 
          sub._id === subscriptionId 
            ? { ...sub, status: 'active' }
            : sub
        )
      );
      alert('Plan has been resumed successfully');
    } catch (error) {
      console.error('Error resuming plan:', error);
      alert('Error resuming plan');
    }
  };

  const quickStats = [
    { 
      label: 'My Subscriptions', 
      value: subscriptions.length.toString(), 
      icon: CheckCircleIcon, 
      color: 'text-primary' 
    },
    { 
      label: 'Active Plans', 
      value: activeSubscriptions.length.toString(), 
      icon: CheckCircleIcon, 
      color: 'text-success' 
    },
    { 
      label: 'Old Plans', 
      value: terminatedSubscriptions.length.toString(), 
      icon: ChartBarIcon, 
      color: 'text-gray-600' 
    }
  ];

  const recommendedPlan = products.length > 0 ? {
    name: products[0].name,
    price: `$${products[0].price}/${products[0].name.toLowerCase().includes('yearly') ? 'year' : 'month'}`,
    features: ['Premium features', 'Priority support', 'Advanced analytics', '24/7 support'],
    savings: 'Best Value'
  } : {
    name: 'Premium Plan',
    price: '$49/month',
    features: ['Premium features', 'Priority support', 'Advanced analytics', '24/7 support'],
    savings: 'Best Value'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Subscription Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, {user?.name || 'User'}</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600 mt-1">Manage your subscriptions and billing</p>
            </div>
            <button
              onClick={() => setShowNewSubscriptionModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Subscription</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color === 'text-primary' ? 'bg-blue-100' : stat.color === 'text-success' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color === 'text-primary' ? 'text-blue-600' : stat.color === 'text-success' ? 'text-green-600' : 'text-gray-600'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Subscriptions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Subscriptions</h2>
                <button
                  onClick={() => setShowOldPlans(!showOldPlans)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    showOldPlans 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showOldPlans ? 'Hide Old Plans' : 'Show Old Plans'}
                </button>
              </div>
              
              {/* Subscription Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Product</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Start Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Last Billed</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Grace Time</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscriptions.length > 0 ? subscriptions
                      .filter(sub => showOldPlans ? true : sub.status !== 'cancelled')
                      .map((subscription) => (
                      <tr key={subscription._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-mono text-sm text-gray-600">#{subscription._id.slice(-8)}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {subscription.planId?.billingCycle || 'monthly'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-gray-900">{subscription.planId?.name || 'Unknown'}</p>
                            <p className="text-sm text-gray-500">${subscription.pricing?.finalPrice || subscription.planId?.price || '0.00'}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscription.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : subscription.status === 'paused'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              subscription.status === 'active' 
                                ? 'bg-green-400' 
                                : subscription.status === 'paused'
                                ? 'bg-yellow-400'
                                : 'bg-red-400'
                            }`}></div>
                            {subscription.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{new Date(subscription.startDate).toLocaleDateString()}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {subscription.lastBilledDate ? new Date(subscription.lastBilledDate).toLocaleDateString() : '-'}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">7 days</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-2">
                            {subscription.status === 'active' && (
                              <>
                                <button
                                  onClick={() => handleUpgradePlan(subscription)}
                                  className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
                                  title="Upgrade/Downgrade Plan"
                                >
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                  </svg>
                                  Change
                                </button>
                                <button
                                  onClick={() => handleWindUpPlan(subscription._id)}
                                  className="inline-flex items-center px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-md hover:bg-yellow-100 transition-colors border border-yellow-200"
                                  title="Pause Subscription"
                                >
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Pause
                                </button>
                                <button
                                  onClick={() => handleCancelPlan(subscription._id)}
                                  className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-md hover:bg-red-100 transition-colors border border-red-200"
                                  title="Cancel Subscription"
                                >
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Cancel
                                </button>
                              </>
                            )}
                            {subscription.status === 'paused' && (
                              <button
                               onClick={() => handleResumePlan(subscription._id)}
                               className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-md hover:bg-green-100 transition-colors border border-green-200"
                               title="Resume Subscription"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Resume
                              </button>
                            )}
                            {subscription.status === 'cancelled' && (
                              <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-md border border-gray-200">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelled
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="8" className="py-12 px-4 text-center">
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
                            <p className="text-gray-500 mb-4">Get started by creating your first subscription</p>
                            <button
                              onClick={() => setShowNewSubscriptionModal(true)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Create Subscription
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* User Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Account Info</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Name</span>
                  <span className="font-medium text-gray-900">{user?.userName || 'Unknown'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="font-medium text-sm text-gray-900">{user?.email || 'Unknown'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">User ID</span>
                  <span className="font-medium text-xs text-gray-900">{user?.id ? user.id.slice(-8) : 'Unknown'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      user?.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    {user?.status || 'inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Available Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Available Plans</h3>
              </div>
              <div className="space-y-4">
                {products.slice(0, 3).map((product) => (
                  <div key={product._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Billing: {product.billingCycle}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          product.isActive ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500 capitalize">Category: {product.category}</span>
                    </div>
                  </div>
                ))}
                {products.length > 3 && (
                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-500">+{products.length - 3} more plans available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* New Subscription Modal */}
        {showNewSubscriptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Create New Subscription</h3>
                    <p className="text-gray-600 mt-1">Choose a plan and billing cycle for your new subscription</p>
                  </div>
                  <button
                    onClick={() => setShowNewSubscriptionModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h4>
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product._id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h5 className="text-lg font-semibold text-gray-900">{product.name}</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Billing: {product.billingCycle} | Category: {product.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleNewSubscription(product._id, 'monthly')}
                              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                              Monthly
                            </button>
                            <button
                              onClick={() => handleNewSubscription(product._id, 'yearly')}
                              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                              Yearly
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowNewSubscriptionModal(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade Plan Modal */}
        {showUpgradeModal && selectedSubscription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Change Plan</h3>
                    <p className="text-gray-600 mt-1">Upgrade or downgrade your current subscription</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUpgradeModal(false);
                      setSelectedSubscription(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Current Plan</h4>
                    <p className="text-gray-700 text-lg">{selectedSubscription.planId?.name || 'Unknown Plan'}</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      ${selectedSubscription.pricing?.finalPrice || selectedSubscription.planId?.price || '0.00'}/{selectedSubscription.planId?.billingCycle || 'monthly'}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h4>
                    <div className="space-y-4">
                      {products
                       .filter(product => product._id !== selectedSubscription.planId?._id)
                        .map((product) => (
                          <div key={product._id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h5 className="text-lg font-semibold text-gray-900">{product.name}</h5>
                                <p className="text-sm text-gray-600 mt-1">
                                  Billing: {product.billingCycle} | Category: {product.category}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                              </div>
                            </div>
                            <button 
                             onClick={() => handleUpgradeToPlan(product._id)}
                             className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                               parseFloat(product.price) > parseFloat(selectedSubscription.pricing?.finalPrice || selectedSubscription.planId?.price || 0) 
                                 ? 'bg-green-600 text-white hover:bg-green-700' 
                                 : 'bg-orange-600 text-white hover:bg-orange-700'
                             }`}
                           >
                             {parseFloat(product.price) > parseFloat(selectedSubscription.pricing?.finalPrice || selectedSubscription.planId?.price || 0) ? 'Upgrade to This Plan' : 'Downgrade to This Plan'}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowUpgradeModal(false);
                      setSelectedSubscription(null);
                    }}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SubscriptionDashboard;

