const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints (get user from token)
  async getUser(userId) {
    // For now, return demo data since we don't have a user endpoint
    return {
      success: true,
      data: {
        id: userId,
        userName: 'John Doe',
        email: 'john.doe@example.com',
        status: 'active'
      }
    };
  }

  // Subscription endpoints
  async getSubscriptionsByUser(userId) {
    return this.request(`/subscriptions/user/${userId}`);
  }

  async getAllSubscriptions() {
    return this.request('/subscriptions/all');
  }

  async getSubscriptionById(subscriptionId) {
    return this.request(`/subscriptions/${subscriptionId}`);
  }

  async createSubscription(subscriptionData) {
    return this.request('/subscriptions/create', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async updateSubscription(subscriptionId, updateData) {
    return this.request(`/subscriptions/update/${subscriptionId}`, {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
  }

  async deleteSubscription(subscriptionId) {
    return this.request(`/subscriptions/delete/${subscriptionId}`, {
      method: 'POST',
    });
  }

  async upgradeSubscription(subscriptionId, newPlanId) {
    return this.request('/subscriptions/upgrade', {
      method: 'POST',
      body: JSON.stringify({ subscriptionId, newPlanId }),
    });
  }

  async downgradeSubscription(subscriptionId, newPlanId) {
    return this.request('/subscriptions/downgrade', {
      method: 'POST',
      body: JSON.stringify({ subscriptionId, newPlanId }),
    });
  }

  async cancelSubscription(subscriptionId, reason) {
    return this.request('/subscriptions/cancel', {
      method: 'POST',
      body: JSON.stringify({ subscriptionId, reason }),
    });
  }

  // Plan endpoints
  async getProducts() {
    return this.request('/plans/all');
  }

  async getPlanById(planId) {
    return this.request(`/plans/${planId}`);
  }

  // Pause/Resume functionality (custom endpoints)
  async pauseSubscription(subscriptionId) {
    return this.updateSubscription(subscriptionId, { status: 'paused' });
  }

  async resumeSubscription(subscriptionId) {
    return this.updateSubscription(subscriptionId, { status: 'active' });
  }
}

export const api = new ApiService();
