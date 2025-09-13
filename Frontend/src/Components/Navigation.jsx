import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

// Simple SVG Icons
const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

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

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Subscriptions', href: '/subscriptions', icon: '📋' },
    { name: 'Analytics', href: '/analytics', icon: '📈' },
    { name: 'Billing', href: '/billing', icon: '💳' },
    { name: 'Plans', href: '/plans', icon: '💎' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size={40} />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? 'bg-accent text-white shadow-md'
                      : 'text-text hover:bg-gray-100 hover:text-accent'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-3 text-text hover:text-accent hover:bg-gray-100 rounded-lg transition-all duration-200 relative">
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-text">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-text" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-medium border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-text">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link to="/settings" className="block px-4 py-3 text-sm text-text hover:bg-gray-100">Profile Settings</Link>
                    <Link to="/settings" className="block px-4 py-3 text-sm text-text hover:bg-gray-100">Account Settings</Link>
                    <Link to="/billing" className="block px-4 py-3 text-sm text-text hover:bg-gray-100">Billing</Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-sm text-error hover:bg-red-50">Sign out</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-text hover:text-accent hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Logo size={32} />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-text hover:text-accent hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-accent text-white shadow-md'
                      : 'text-text hover:bg-gray-100 hover:text-accent'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Profile Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <UserIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link to="/settings" className="block px-4 py-2 text-sm text-text hover:bg-gray-100 rounded-lg">Profile Settings</Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-text hover:bg-gray-100 rounded-lg">Account Settings</Link>
                <Link to="/billing" className="block px-4 py-2 text-sm text-text hover:bg-gray-100 rounded-lg">Billing</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 rounded-lg">Sign out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
