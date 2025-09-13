import React from "react";
import { Link } from "react-router-dom"; // ✅ import Link
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
//

<nav className="dashboard-nav">
  <Link to="/admin" className="nav-btn">Dashboard</Link>
  <Link to="/plans" className="nav-btn">Plans</Link>
  <Link to="/users" className="nav-btn">Users</Link>
  <Link to="/subscriptions" className="nav-btn">Subscriptions</Link>
  <Link to="/analytics" className="nav-btn">Analytics</Link>
</nav>
//
const data = [
  { day: "Day 1", revenue: 1200 },
  { day: "Day 5", revenue: 2300 },
  { day: "Day 10", revenue: 1800 },
  { day: "Day 15", revenue: 2600 },
  { day: "Day 20", revenue: 3000 },
  { day: "Day 25", revenue: 4200 },
  { day: "Day 30", revenue: 5000 },
];

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h2>🛡️ ADMIN PANEL</h2>
        <div className="header-actions">
          <span>🔔</span>
          <span>Admin ⬇️</span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <Link to="/admin">Dashboard</Link>
        <Link to="/plans">Plans</Link>
        <Link to="/users">Users</Link>
        <Link to="/subscriptions">Subscriptions</Link>
        <Link to="/analytics">Analytics</Link>
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
          <LineChart data={data}>
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

      <section className="bottom-section">
        {/* Recent Activities */}
        <div className="recent-activities">
          <h3>🔥 Recent Activities</h3>
          <ul>
            <li>• 15 new subs</li>
            <li>• 3 upgrades</li>
            <li>• 2 downgrades</li>
            <li>• 1 cancel</li>
          </ul>
          <button>View All</button>
        </div>

        {/* Alerts */}
        <div className="alerts">
          <h3>⚠️ Alerts & Notifications</h3>
          <ul>
            <li>• High churn rate in Starter plan</li>
            <li>• Payment failures increased 15%</li>
            <li>• Server response time &gt; 2s</li>
          </ul>
          <button>View All Alerts</button>
        </div>
      </section>

      <section className="bottom-section">
        {/* Top Plans */}
        <div className="top-plans">
          <h3>🏆 Top Performing Plans</h3>
          <ol>
            <li>1. Pro ($29)</li>
            <li>2. Business</li>
            <li>3. Basic ($9)</li>
          </ol>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>📋 Quick Actions</h3>
          <button>+ Add New Plan</button>
          <button>📤 Export Data</button>
          <button>📧 Send Newsletter</button>
          <button>🎁 Create Discount</button>
          <button>👥 Manage Users</button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
