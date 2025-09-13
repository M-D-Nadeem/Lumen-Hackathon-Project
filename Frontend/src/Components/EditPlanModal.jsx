import React, { useState, useEffect } from "react";
import "./EditPlanModal.css";

export default function EditPlanModal({ plan, isOpen, onClose, onUpdatePlan }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    period: "month",
    description: "",
    color: "#3b82f6",
    features: "",
    status: "active"
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || "",
        price: plan.price || "",
        period: plan.period || "month",
        description: plan.description || "",
        color: plan.color || "#3b82f6",
        features: plan.features ? plan.features.join(', ') : "",
        status: plan.status || "active"
      });
    }
  }, [plan]);

  if (!isOpen || !plan) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Plan name is required";
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const updatedPlan = {
      ...plan,
      name: formData.name,
      price: parseFloat(formData.price),
      period: formData.period,
      description: formData.description,
      color: formData.color,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      status: formData.status,
      lastUpdated: new Date().toISOString()
    };

    onUpdatePlan(updatedPlan);
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Plan</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
        
        <form className="plan-form" onSubmit={handleSave}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Plan Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="e.g., Bronze, Silver, Gold"
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={errors.price ? 'error' : ''}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.price && <div className="error-text">{errors.price}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="period">Billing Period</label>
              <select
                id="period"
                name="period"
                value={formData.period}
                onChange={handleInputChange}
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
                <option value="week">Weekly</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="color">Plan Color</label>
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="color-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Describe what this plan offers..."
              rows="3"
            />
            {errors.description && <div className="error-text">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="features">Features (comma-separated)</label>
            <textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              placeholder="e.g., Basic support, 1 user, 5GB storage"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Plan Stats Info */}
          <div className="plan-stats-info">
            <div className="stat-item">
              <label>Current Users:</label>
              <span>{plan.users || 0}</span>
            </div>
            <div className="stat-item">
              <label>Monthly Revenue:</label>
              <span>${(plan.revenue || 0).toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <label>Created:</label>
              <span>6 months ago</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
