import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
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
          _id: '68c51bb6fb2ab04ca431c1d1',
          userName: 'Demo User',
          email: 'demo@example.com',
          status: 'active'
        });
        setSubscriptions([]);
        setProducts([
          {
            _id: '1',
            name: 'Basic Plan',
            price: 29.99,
            billingCycle: 'monthly',
            category: 'basic',
            isActive: true
          },
          {
            _id: '2',
            name: 'Gold Plan',
            price: 59.99,
            billingCycle: 'monthly',
            category: 'gold',
            isActive: true
          },
          {
            _id: '3',
            name: 'Premium Plan',
            price: 99.99,
            billingCycle: 'monthly',
            category: 'premium',
            isActive: true
          }
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

  const handleUpgradePlan = (subscription) => {
    setSelectedSubscription(subscription);
  };

  const handleUpgradeToPlan = async (subscriptionId, newPlanId) => {
    try {
      await api.upgradeSubscription(subscriptionId, newPlanId);
      // Refresh subscriptions data
      const userId = '68c51bb6fb2ab04ca431c1d1';
      const subscriptionsResponse = await api.getSubscriptionsByUser(userId);
      setSubscriptions(subscriptionsResponse.data);
      setSelectedSubscription(null);
      alert('Plan upgraded successfully!');
    } catch (error) {
      console.error('Error upgrading plan:', error);
      alert('Error upgrading plan: ' + error.message);
    }
  };

  const handleCreateSubscription = async (planId) => {
    try {
      const userId = '68c51bb6fb2ab04ca431c1d1';
      const plan = products.find(p => p._id === planId);
      
      if (!plan) {
        alert('Plan not found');
        return;
      }

      const subscriptionData = {
        userId: userId,
        planId: planId,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + (plan.billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
        pricing: {
          originalPrice: plan.price,
          discountApplied: 0,
          finalPrice: plan.price
        }
      };

      await api.createSubscription(subscriptionData);
      
      // Refresh subscriptions data
      const subscriptionsResponse = await api.getSubscriptionsByUser(userId);
      setSubscriptions(subscriptionsResponse.data);
      alert('Subscription created successfully!');
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Error creating subscription: ' + error.message);
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-bold text-text">Welcome, {user?.userName || 'User'}!</h1>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {user?.status || 'inactive'}
            </span>
          </div>
          <p className="text-gray-600">Manage your subscriptions and plans</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Subscriptions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-text mb-6">My Subscriptions</h2>
              
              {/* Subscription Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Subscription ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Plan</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Start Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">End Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Billing Cycle</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscriptions.length > 0 ? subscriptions
                      .filter(sub => showOldPlans ? true : sub.status !== 'cancelled')
                      .map((subscription) => (
                      <tr key={subscription._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-text">#{subscription._id.slice(-8)}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-text">{subscription.planId?.name || 'Unknown Plan'}</p>
                            <p className="text-sm text-gray-500 capitalize">{subscription.planId?.category || 'basic'}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-text">${subscription.pricing?.finalPrice || subscription.planId?.price || '0.00'}</p>
                            {subscription.pricing?.discountApplied > 0 && (
                              <p className="text-sm text-green-600">-${subscription.pricing.discountApplied} discount</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subscription.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : subscription.status === 'paused'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subscription.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{new Date(subscription.startDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(subscription.endDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-gray-600 capitalize">{subscription.planId?.billingCycle || 'monthly'}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {subscription.status === 'active' && (
                              <>
                                <button
                                  onClick={() => handleUpgradePlan(subscription)}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors"
                                >
                                  Upgrade
                                </button>
                                <button
                                  onClick={() => handleWindUpPlan(subscription._id)}
                                  className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded hover:bg-yellow-200 transition-colors"
                                >
                                  Wind Up
                                </button>
                                <button
                                  onClick={() => handleCancelPlan(subscription._id)}
                                  className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition-colors"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {subscription.status === 'paused' && (
                              <button
                                onClick={() => handleResumePlan(subscription._id)}
                                className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition-colors"
                              >
                                Resume
                              </button>
                            )}
                            {subscription.status === 'cancelled' && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                                Cancelled
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="8" className="py-8 px-4 text-center text-gray-500">
                          No subscriptions found.
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
            <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-text">User Info</h3>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{user?.userName || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-sm">{user?.email || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID:</span>
                  <span className="font-medium text-xs">{user?._id ? user._id.slice(-8) : 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user?.status || 'inactive'}
                  </span>
                </div>
              </div>
              
              {/* See Old Plans Button */}
              <button
                onClick={() => setShowOldPlans(!showOldPlans)}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  showOldPlans 
                    ? 'bg-accent text-white hover:bg-blue-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showOldPlans ? 'Hide Old Plans' : 'See Old Plans'}
              </button>
            </div>

            {/* Available Products */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-text">Available Plans</h3>
              </div>
              <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                  <div key={product._id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-text">{product.name}</h4>
                      <span className="text-lg font-bold text-primary">${product.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Billing: {product.billingCycle}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500 capitalize">Category: {product.category}</span>
                      <button
                        onClick={() => handleCreateSubscription(product._id)}
                        className="px-3 py-1 bg-accent text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                ))}
                {products.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">+{products.length - 5} more plans</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Plan Modal */}
        {selectedSubscription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text">Upgrade Plan</h3>
                  <button
                    onClick={() => setSelectedSubscription(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-text mb-2">Current Plan</h4>
                    <p className="text-gray-600">{selectedSubscription.planId?.name || 'Unknown Plan'}</p>
                    <p className="text-lg font-bold text-primary">
                      ${selectedSubscription.pricing?.finalPrice || selectedSubscription.planId?.price || '0.00'}/{selectedSubscription.planId?.billingCycle || 'month'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-text mb-3">Available Upgrades</h4>
                    <div className="space-y-3">
                      {products
                        .filter(product => product._id !== selectedSubscription.planId?._id)
                        .slice(0, 5)
                        .map((product) => (
                          <div key={product._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-text">{product.name}</h5>
                                <p className="text-sm text-gray-600">
                                  Billing: {product.billingCycle} | Category: {product.category}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">${product.price}</p>
                                <button 
                                  onClick={() => handleUpgradeToPlan(selectedSubscription._id, product._id)}
                                  className="mt-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                >
                                  Upgrade to This Plan
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setSelectedSubscription(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
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

