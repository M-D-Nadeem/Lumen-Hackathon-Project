import { useState } from 'react';
import { fetchHealth, fetchChurn, fetchRecommendations } from '../../ml/apiClient';
import './RecommendationWidget.css';

export default function RecommendationWidget({ defaultUserId = '', topN = 3, showChurn = true, showRecommendations = true }) {
  const [userId, setUserId] = useState(defaultUserId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState(null);
  const [churn, setChurn] = useState(null);
  const [recs, setRecs] = useState([]);

  const probabilityClass = (p) => {
    if (p < 0.3) return 'ml-prob-low';
    if (p < 0.6) return 'ml-prob-mid';
    return 'ml-prob-high';
  };

  const run = async () => {
    setLoading(true); setError(null); setChurn(null); setRecs([]);
    try {
      const h = await fetchHealth();
      setHealth(h);
      const promises = [];
      if (showChurn) promises.push(fetchChurn(userId)); else promises.push(Promise.resolve(null));
      if (showRecommendations) promises.push(fetchRecommendations(userId, topN)); else promises.push(Promise.resolve(null));
      const [c, r] = await Promise.all(promises);
      if (c) setChurn(c);
      if (r) setRecs(r.recommendations || r.Recommendations || []);
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="ml-widget">
      <h3>ML Insights Widget</h3>
      <div className="ml-widget-controls">
        <input
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          className="ml-widget-input"
        />
        <button disabled={!userId || loading} onClick={run} className="ml-widget-button">
          {loading ? '...' : 'Fetch'}
        </button>
      </div>
      {health && <p className="ml-service-status">Service: <strong>{health.status || 'unknown'}</strong></p>}
      {error && <p className="ml-error">{error}</p>}
      {showChurn && churn && churn.churn_probability !== undefined && (
        <div className="ml-section">
          <h4>Churn Prediction</h4>
          {'churn_risk' in churn && typeof churn.churn_risk === 'string' && churn.churn_risk === 'User not found' && (
            <p className="ml-empty">User not found in feature dataset.</p>
          )}
          {typeof churn.churn_probability === 'number' && (
            <p className={probabilityClass(churn.churn_probability)}>Probability: {(churn.churn_probability * 100).toFixed(2)}%</p>
          )}
        </div>
      )}
      {showRecommendations && (
        <div className="ml-section">
          <h4>Recommendations</h4>
          {!recs.length && !loading && <p className="ml-empty">No recommendations yet.</p>}
          {!!recs.length && (
            <ul className="ml-list">
              {recs.map(r => <li key={r}>{r}</li>)}
            </ul>
          )}
        </div>
      )}
      <p className="ml-footnote">Powered by FastAPI ML Service</p>
    </div>
  );
}
