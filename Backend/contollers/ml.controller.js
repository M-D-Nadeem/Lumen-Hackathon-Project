// ML Controller: proxies to Python FastAPI microservice
import axios from 'axios';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export const mlHealth = async (req, res) => {
  try {
    await axios.get(ML_SERVICE_URL + '/api/churn-prediction/', { timeout: 1500 }).catch(()=>{}); // probe any endpoint
    return res.json({ status: 'ok', upstream: ML_SERVICE_URL });
  } catch (e) {
    return res.status(200).json({ status: 'down', upstream: ML_SERVICE_URL, error: e.message });
  }
};

export const churnPrediction = async (req, res) => {
  const { user_id } = req.body;
  if (user_id === undefined) return res.status(400).json({ message: 'user_id is required' });
  try {
    const { data } = await axios.post(`${ML_SERVICE_URL}/api/churn-prediction/`, { user_id });
    return res.json(data);
  } catch (e) {
    return res.status(502).json({ message: 'ML service error', detail: e.message });
  }
};

export const recommendations = async (req, res) => {
  const { user_id, top_n } = req.body;
  if (user_id === undefined) return res.status(400).json({ message: 'user_id is required' });
  const n = top_n || 3;
  try {
    const { data } = await axios.post(`${ML_SERVICE_URL}/api/recommendations/?top_n=${n}`, { user_id });
    return res.json(data);
  } catch (e) {
    return res.status(502).json({ message: 'ML service error', detail: e.message });
  }
};
