# ML Integration Guide

This document explains how to run and integrate the standalone Machine Learning (ML) service (FastAPI) with the existing project **without modifying other teammates' work**. You can optionally expose an ML demo page or inline widget.

---
## 1. Overview
The ML microservice provides:

Endpoint | Method | Purpose | Body
---------|--------|---------|------
`/api/churn-prediction/` | POST | Predicts churn class & probability | `{ "user_id": 123 }`
`/api/recommendations/?top_n=3` | POST | Returns recommended plan / product IDs | `{ "user_id": 123 }`

The frontend can talk directly to the FastAPI ML service (for now) using the files added under `Frontend/src/ml` and `Frontend/src/Components/ML`.

---
## 2. Folder Additions

Added Files (non‑intrusive):
- `Frontend/src/ml/apiClient.js` – Small fetch wrapper for ML endpoints.
- `Frontend/src/Components/ML/RecommendationWidget.jsx` – Reusable widget.
- `Frontend/src/Pages/MLDemo.jsx` – Optional page; not auto‑wired into router.

No existing teammate file was modified. To expose the demo page, manually add a route (instructions below).

---
## 3. Environment Variables

Frontend `.env` (create if missing):
```
VITE_ML_BASE=http://localhost:8000
```

FastAPI expects model/data in `ml_recommendation/` relative paths. (Future: you can externalize via env vars.)

---
## 4. Running All Services (Development)

Terminal 1 – ML Service:
```
cd ml_recommendation
pip install fastapi uvicorn pandas scikit-learn joblib
uvicorn main:app --reload --port 8000
```

Terminal 2 – Backend (if needed for other features):
```
cd Backend
npm install
npm start
```

Terminal 3 – Frontend:
```
cd Frontend
npm install
npm run dev
```

Visit: `http://localhost:5173` (Vite default). If you wire in the ML demo route, navigate to `/ml`.

---
## 5. Optionally Add ML Demo Route

Open `Frontend/src/App.jsx` and (if acceptable to teammates) add:
```jsx
import MLDemo from './Pages/MLDemo.jsx';
// ... inside <Routes>
<Route path="/ml" element={<MLDemo />} />
```

If you prefer not to touch existing `App.jsx`, you can import the `RecommendationWidget` directly into any existing page (e.g., `AdminDashboard.jsx`):
```jsx
import RecommendationWidget from '../Components/ML/RecommendationWidget';
// inside component JSX
<RecommendationWidget topN={5} />
```

---
## 6. RecommendationWidget Props

Prop | Type | Default | Description
-----|------|---------|------------
`defaultUserId` | string/number | `''` | Pre-fill the user ID input.
`topN` | number | `3` | How many recommendations to request.
`showChurn` | boolean | `true` | Toggle churn prediction section.
`showRecommendations` | boolean | `true` | Toggle recommendations section.

---
## 7. Example Responses

Churn (existing format):
```json
{
  "user_id": 123,
  "churn_risk": 0,
  "churn_probability": 0.2734
}
```

Recommendations:
```json
{
  "user_id": 123,
  "recommendations": [45, 72, 88]
}
```

If a user is missing:
```json
{ "user_id": 999, "churn_risk": "User not found" }
```

---
## 8. Extending Toward Production

Area | Next Step
-----|----------
Health Check | Add `/health` endpoint returning `{ "status": "ok" }`.
Meta | Add `/meta` with model version & feature list.
Unified Responses | Wrap all outputs: `{ success, data, error }`.
Error Handling | Replace string markers like `"User not found"` with structured error.
Cold Start | Provide fallback popular plans if recommendations empty.
Proxy Integration | Add Node `/api/ml/*` routes once backend stabilizes.
Live Data | Replace CSV with Mongo queries & periodic artifact refresh.
Security | Require internal token or forward user auth claims.

---
## 9. Troubleshooting

Issue | Possible Cause | Fix
------|----------------|----
`fetch failed` in widget | ML service not running | Start FastAPI on port 8000.
All recs empty | User not in interaction matrix | Use a different `user_id` or implement cold start fallback.
Churn returns `User not found` | No feature row in CSV | Verify the user ID exists in `subscriptions_cleaned.csv`.
CORS error (direct calls) | CORS misconfig | Ensure FastAPI CORS middleware is present (already added).

---
## 10. Quick Curl Tests

Churn Prediction:
```
curl -X POST http://localhost:8000/api/churn-prediction/ \
  -H "Content-Type: application/json" \
  -d '{"user_id": 123}'
```

Recommendations:
```
curl -X POST "http://localhost:8000/api/recommendations/?top_n=3" \
  -H "Content-Type: application/json" \
  -d '{"user_id": 123}'
```

---
## 11. Notes
- The current implementation is a prototype using static data; production integration should version model artifacts and implement retraining.
- No teammate code was altered; all ML integration assets are additive and optional.

---
## 12. Contact / Ownership
ML Service Owner: Recommendation/Churn developer (your branch: `feature/recommendation`).
Frontend Integration: Any team member can mount the widget or route without risk.

---
End of Guide.
