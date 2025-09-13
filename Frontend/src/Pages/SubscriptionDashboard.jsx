import React, { useState } from 'react';
import Navigation from '../Components/Navigation';

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

  const quickStats = [
    { label: 'Active', value: '2', icon: CheckCircleIcon, color: 'text-success' },
    { label: 'Spending', value: '$58', icon: CreditCardIcon, color: 'text-accent' },
    { label: 'Savings', value: '$12', icon: ChartBarIcon, color: 'text-success' }
  ];

  const activeSubscriptions = [
    {
      name: 'Pro Plan',
      price: '$29/month',
      renews: 'Dec 15, 2025',
      status: 'active',
      features: ['Unlimited projects', 'Priority support', 'Advanced analytics']
    },
    {
      name: 'Spotify Premium',
      price: '$9.99/month',
      renews: 'Jan 3, 2025',
      status: 'active',
      features: ['Ad-free music', 'Offline downloads', 'High quality audio']
    }
  ];

  const recommendedPlan = {
    name: 'Business Plan',
    price: '$49/month',
    features: ['Everything in Pro', 'Team collaboration', 'Custom integrations', '24/7 support'],
    savings: 'Save $20/month'
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-bold text-text">Welcome back, John!</h1>
            <StarIcon className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-gray-600">Here's an overview of your subscription management</p>
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
              <h2 className="text-lg font-semibold text-text mb-6">Active Subscriptions</h2>
              <div className="space-y-4">
                {activeSubscriptions.map((subscription, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text">{subscription.name}</h3>
                        <p className="text-sm text-gray-600">Renews: {subscription.renews}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{subscription.price}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-success">
                          Active
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subscription.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-semibold text-text">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Get support or learn more about managing your subscriptions.</p>
              <button className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium">
                Contact Support
              </button>
            </div>

            {/* Recommended Plan */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-soft border border-blue-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <h3 className="font-semibold text-text">RECOMMENDED</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-2 border-dashed border-accent">
                <h4 className="font-bold text-lg text-text mb-2">{recommendedPlan.name}</h4>
                <p className="text-2xl font-bold text-primary mb-3">{recommendedPlan.price}</p>
                <p className="text-sm text-success font-medium mb-4">{recommendedPlan.savings}</p>
                
                <ul className="space-y-2 mb-4">
                  {recommendedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircleIcon className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all duration-200 font-medium">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionDashboard;
