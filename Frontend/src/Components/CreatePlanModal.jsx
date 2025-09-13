import React, { useState } from "react";
import "./CreatePlanModal.css";

export default function CreatePlanModal({ isOpen, onClose, onCreatePlan }) {
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

  if (!isOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newPlan = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      price: parseFloat(formData.price),
      period: formData.period,
      description: formData.description,
      color: formData.color,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      status: formData.status,
      users: 0,
      revenue: 0
    };

    onCreatePlan(newPlan);
    
    // Reset form
    setFormData({
      name: "",
      price: "",
      period: "month",
      description: "",
      color: "#3b82f6",
      features: "",
      status: "active"
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      period: "month",
      description: "",
      color: "#3b82f6",
      features: "",
      status: "active"
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Plan</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
        
        <form className="plan-form" onSubmit={handleSubmit}>
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

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
