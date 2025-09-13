import React from "react";
import "./Plans.css";

export default function Plans() {
  return (
    <div className="plans-container">
      <h1 className="plans-title">Our Subscription Plans</h1>

      <div className="plans-grid">
        {/* Basic Plan */}
        <div className="plan-card">
          <h2 className="plan-name">Basic Plan</h2>
          <p className="plan-price">₹499 / month</p>
          <p className="plan-desc">Perfect for individuals starting out.</p>
          <button className="plan-btn">Choose Plan</button>
        </div>

        {/* Pro Plan */}
        <div className="plan-card highlight">
          <h2 className="plan-name">Pro Plan</h2>
          <p className="plan-price">₹999 / month</p>
          <p className="plan-desc">Great for small teams & startups.</p>
          <button className="plan-btn">Choose Plan</button>
        </div>

        {/* Enterprise Plan */}
        <div className="plan-card">
          <h2 className="plan-name">Enterprise</h2>
          <p className="plan-price">₹1999 / month</p>
          <p className="plan-desc">Best for large businesses & enterprises.</p>
          <button className="plan-btn">Choose Plan</button>
        </div>
      </div>
    </div>
  );
}
