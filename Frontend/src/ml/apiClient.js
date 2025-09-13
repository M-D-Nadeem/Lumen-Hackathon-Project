// Lightweight client for calling the standalone FastAPI ML service directly.
// Does NOT depend on existing backend code; purely optional.

const ML_BASE = import.meta.env.VITE_ML_BASE || 'http://localhost:8000';

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    let text;
    try { text = await res.text(); } catch { text = 'Unknown error'; }
    throw new Error(`ML request failed ${res.status}: ${text}`);
  }
  return res.json();
}

export const fetchHealth = async () => {
  try {
    const r = await fetch(`${ML_BASE}/health`);
    if (!r.ok) return { status: 'down' };
    return r.json();
  } catch { return { status: 'down' }; }
};

export const fetchChurn = (userId) =>
  jsonFetch(`${ML_BASE}/api/churn-prediction/`, {
    method: 'POST',
    body: JSON.stringify({ user_id: Number(userId) })
  });

export const fetchRecommendations = (userId, topN = 3) =>
  jsonFetch(`${ML_BASE}/api/recommendations/?top_n=${topN}`, {
    method: 'POST',
    body: JSON.stringify({ user_id: Number(userId) })
  });

export default { fetchHealth, fetchChurn, fetchRecommendations };
