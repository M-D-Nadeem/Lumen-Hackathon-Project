const API_BASE_URL = 'http://localhost:5007/api';

export const api = {
  // Users
  getUsers: () => fetch(`${API_BASE_URL}/users`).then(res => res.json()),
  getUser: (id) => fetch(`${API_BASE_URL}/users/${id}`).then(res => res.json()),
  createUser: (userData) => fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(res => res.json()),
  updateUser: (id, userData) => fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(res => res.json()),
  deleteUser: (id) => fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' }),

  // Products
  getProducts: () => fetch(`${API_BASE_URL}/products`).then(res => res.json()),
  getProduct: (id) => fetch(`${API_BASE_URL}/products/${id}`).then(res => res.json()),
  createProduct: (productData) => fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  }).then(res => res.json()),
  updateProduct: (id, productData) => fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  }).then(res => res.json()),
  deleteProduct: (id) => fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' }),

  // Subscriptions
  getSubscriptions: () => fetch(`${API_BASE_URL}/subscriptions`).then(res => res.json()),
  getSubscription: (id) => fetch(`${API_BASE_URL}/subscriptions/${id}`).then(res => res.json()),
  getSubscriptionsByUser: (userId) => fetch(`${API_BASE_URL}/subscriptions/user/${userId}`).then(res => res.json()),
  createSubscription: (subscriptionData) => fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData)
  }).then(res => res.json()),
  updateSubscription: (id, subscriptionData) => fetch(`${API_BASE_URL}/subscriptions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData)
  }).then(res => res.json()),
  deleteSubscription: (id) => fetch(`${API_BASE_URL}/subscriptions/${id}`, { method: 'DELETE' }),
  pauseSubscription: (id) => fetch(`${API_BASE_URL}/subscriptions/${id}/pause`, { method: 'PATCH' }).then(res => res.json()),
  resumeSubscription: (id) => fetch(`${API_BASE_URL}/subscriptions/${id}/resume`, { method: 'PATCH' }).then(res => res.json()),

  // Billing
  getBilling: () => fetch(`${API_BASE_URL}/billing`).then(res => res.json()),
  getBillingStats: () => fetch(`${API_BASE_URL}/billing/stats`).then(res => res.json()),
  getBillingBySubscription: (subscriptionId) => fetch(`${API_BASE_URL}/billing/subscription/${subscriptionId}`).then(res => res.json()),
  createBilling: (billingData) => fetch(`${API_BASE_URL}/billing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(billingData)
  }).then(res => res.json()),
  updateBilling: (id, billingData) => fetch(`${API_BASE_URL}/billing/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(billingData)
  }).then(res => res.json()),
  deleteBilling: (id) => fetch(`${API_BASE_URL}/billing/${id}`, { method: 'DELETE' }),

  // Subscription Status
  getSubscriptionStatus: () => fetch(`${API_BASE_URL}/subscription-status`).then(res => res.json()),
  getSubscriptionStatusBySubscription: (subscriptionId) => fetch(`${API_BASE_URL}/subscription-status/subscription/${subscriptionId}`).then(res => res.json()),
  createSubscriptionStatus: (statusData) => fetch(`${API_BASE_URL}/subscription-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(statusData)
  }).then(res => res.json()),
  updateSubscriptionStatus: (id, statusData) => fetch(`${API_BASE_URL}/subscription-status/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(statusData)
  }).then(res => res.json()),
  deleteSubscriptionStatus: (id) => fetch(`${API_BASE_URL}/subscription-status/${id}`, { method: 'DELETE' })
};
