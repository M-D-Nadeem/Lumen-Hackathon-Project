<<<<<<< HEAD
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./Components/AdminLayout";

import Dashboard from "./Pages/Dashboard";
import PlansManagement from "./Pages/PlansManagement";
import Users from "./Pages/Users";
import Subscriptions from "./Pages/Subscriptions";
import Analytics from "./Pages/Analytics";

import "./App.css";

export default function App() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plans" element={<PlansManagement />} />
        <Route path="/users" element={<Users />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </AdminLayout>
  );
}
=======
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import Plans from "./Pages/Plans";
import SubscriptionPortal from "./Components/SubscriptionPortal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Welcome Home</h2>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/subscription" element={<SubscriptionPortal />} />
      </Routes>
    </>
  );
}

export default App;
>>>>>>> origin/main
