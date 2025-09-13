import React, { useState } from "react";
import "./SubscriptionPortal.css";

const plans = [
  { 
    id: "basic", 
    name: "Basic Fibernet", 
    price: 20, 
    features: [
      "Subscribe, Renew, Cancel anytime",
      "10GB monthly data quota",
      "Track usage statistics",
      "Basic recommendations (optional)"
    ] 
  },
  { 
    id: "pro", 
    name: "Pro Broadband", 
    price: 40, 
    features: [
      "All Basic features included",
      "50GB monthly data quota",
      "Upgrade/Downgrade anytime",
      "Renewal alerts & notifications",
      "Eligible for seasonal discounts"
    ] 
  },
  { 
    id: "enterprise", 
    name: "Enterprise Unlimited", 
    price: 100, 
    features: [
      "Unlimited monthly data quota",
      "Full analytics dashboard access",
      "AI-powered plan recommendations",
      "Priority admin support",
      "Admin tools for plan & pricing management",
      "Discount & offers management"
    ] 
  }
];

export default function SubscriptionPortal() {
  const [currentPlan, setCurrentPlan] = useState(null);

  const handleSubscribe = (plan) => {
    alert(`Subscribed to ${plan.name} plan`);
    setCurrentPlan(plan);
  };

  const handleUpgradeDowngrade = (plan) => {
    alert(`Changed subscription to ${plan.name} plan`);
    setCurrentPlan(plan);
  };

  const handleCancel = () => {
    alert(`Subscription cancelled for ${currentPlan.name}`);
    setCurrentPlan(null);
  };

  return (
    <div className="subscription-container">
      <h1 className="title">Subscription Management System</h1>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${currentPlan?.id === plan.id ? "active" : ""}`}
          >
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-price">${plan.price}/month</p>
            <ul className="features-list">
              {plan.features.map((f, idx) => (
                <li key={idx}>✅ {f}</li>
              ))}
            </ul>

            {!currentPlan ? (
              <button onClick={() => handleSubscribe(plan)} className="btn subscribe-btn">
                Subscribe
              </button>
            ) : currentPlan.id === plan.id ? (
              <button onClick={handleCancel} className="btn cancel-btn">
                Cancel
              </button>
            ) : (
              <button
                onClick={() => handleUpgradeDowngrade(plan)}
                className="btn upgrade-btn"
              >
                {plan.price > currentPlan.price ? "Upgrade" : "Downgrade"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
