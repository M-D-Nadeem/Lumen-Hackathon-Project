import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="top-navigation">
      <Link 
        to="/" 
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        Dashboard
      </Link>
      <Link 
        to="/plans" 
        className={`nav-item ${location.pathname === '/plans' ? 'active' : ''}`}
      >
        Plans
      </Link>
      <Link 
        to="/users" 
        className={`nav-item ${location.pathname === '/users' ? 'active' : ''}`}
      >
        Users
      </Link>
      <Link 
        to="/subscriptions" 
        className={`nav-item ${location.pathname === '/subscriptions' ? 'active' : ''}`}
      >
        Subscriptions
      </Link>
      <Link 
        to="/analytics" 
        className={`nav-item ${location.pathname === '/analytics' ? 'active' : ''}`}
      >
        Analytics
      </Link>
    </nav>
  );
}
