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
