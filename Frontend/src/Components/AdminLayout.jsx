import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Header />
      <Navigation />
      <main className="layout-content">{children}</main>
    </div>
  );
}
