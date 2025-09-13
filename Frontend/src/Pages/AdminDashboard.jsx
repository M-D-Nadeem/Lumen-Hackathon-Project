import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./AdminDashboard.css";

// Revenue data
const revenueData = [
  { day: "Day 1", revenue: 1200 },
  { day: "Day 5", revenue: 2300 },
  { day: "Day 10", revenue: 1800 },
  { day: "Day 15", revenue: 2600 },
  { day: "Day 20", revenue: 3000 },
  { day: "Day 25", revenue: 4200 },
  { day: "Day 30", revenue: 5000 },
];

// Mock Top Plans Data
const plansData = {
  recent: [
    { name: "Pro", sales: 120 },
    { name: "Business", sales: 90 },
    { name: "Basic", sales: 70 },
  ],
  month: [
    { name: "Pro", sales: 420 },
    { name: "Enterprise", sales: 300 },
    { name: "Business", sales: 250 },
  ],
  year: [
    { name: "Enterprise", sales: 3200 },
    { name: "Pro", sales: 2800 },
    { name: "Business", sales: 2100 },
  ],
};

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("recent");
  const navigate = useNavigate();

  // ✅ Logout handler
  const handleLogout = () => {
    // Clear any stored tokens/session (if used)
    localStorage.removeItem("authToken");

    // Redirect to home/login
    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h2>🛡️ ADMIN PANEL</h2>
        <div className="header-actions">
          <span>🔔</span>
          <span>Admin ⬇️</span>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <Link to="/admin" className="nav-btn">Dashboard</Link>
        <Link to="/plans" className="nav-btn">Plans</Link>
        <Link to="/users" className="nav-btn">Users</Link>
        <Link to="/subscriptions" className="nav-btn">Subscriptions</Link>
        <Link to="/analytics" className="nav-btn">Analytics</Link>
      </nav>

      {/* Metrics */}
      <section className="metrics">
        <div className="card">
          <h4>Total Users</h4>
          <p>12,458</p>
          <span className="success">+5.2%</span>
        </div>
        <div className="card">
          <h4>Active Subs</h4>
          <p>8,234</p>
          <span className="success">+8.1%</span>
        </div>
        <div className="card">
          <h4>Monthly Revenue</h4>
          <p>$45,230</p>
          <span className="success">+12.5%</span>
        </div>
        <div className="card">
          <h4>Churn Rate</h4>
          <p>3.2%</p>
          <span className="error">-0.8%</span>
        </div>
      </section>

      {/* Analytics */}
      <section className="analytics">
        <h3>📈 Real-Time Analytics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3498DB"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Top Plans Section */}
      <section className="analytics">
        <div className="flex justify-between items-center mb-4">
          <h3>🏆 Top Plans</h3>
          <div className="time-filter">
            <button
              className="nav-btn"
              onClick={() => setTimeRange("recent")}
            >
              Recent
            </button>
            <button
              className="nav-btn"
              onClick={() => setTimeRange("month")}
            >
              Month
            </button>
            <button
              className="nav-btn"
              onClick={() => setTimeRange("year")}
            >
              Year
            </button>
          </div>
        </div>

        <ul>
          {plansData[timeRange].map((plan, index) => (
            <li key={index}>
              {index + 1}. {plan.name} ({plan.sales} subs)
            </li>
          ))}
        </ul>
        <Link to="/plans">
          <button className="nav-btn mt-2">View All Plans</button>
        </Link>
      </section>
    </div>
  );
};

export default AdminDashboard;
