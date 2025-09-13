const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5007';

async function request(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}

export const getChurn = (userId) =>
  request('/api/ml/churn', { method: 'POST', body: JSON.stringify({ user_id: Number(userId) }) });

export const getRecommendations = (userId, topN = 3) =>
  request('/api/ml/recommendations', { method: 'POST', body: JSON.stringify({ user_id: Number(userId), top_n: topN }) });

export const getMlHealth = () => request('/api/ml/health');

export default { getChurn, getRecommendations, getMlHealth };
