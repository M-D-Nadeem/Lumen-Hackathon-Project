# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(title="Subscription AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML models
churn_model = joblib.load('models/churn_model.pkl')
user_product_matrix = joblib.load('models/user_product_matrix.pkl')

# Load preprocessed datasets
subscriptions = pd.read_csv('data/subscriptions_cleaned.csv')
plans = pd.read_csv('data/subscription_plans.csv')

# Request body for user info (optional)
class UserRequest(BaseModel):
    user_id: int

# Endpoint: Churn Prediction
@app.post("/api/churn-prediction/")
def predict_churn(user: UserRequest):
    # Fetch user subscription features
    features = ['subscription_duration', 'days_since_last_renewal', 'success_rate', 'Grace Time', 'subscription_type']
    user_data = subscriptions[subscriptions['User Id'] == user.user_id][features]
    
    if user_data.empty:
        return {"user_id": user.user_id, "churn_risk": "User not found"}
    
    churn_pred = churn_model.predict(user_data)[0]
    churn_prob = churn_model.predict_proba(user_data)[0][1]
    
    return {"user_id": user.user_id, "churn_risk": int(churn_pred), "churn_probability": float(churn_prob)}

# Endpoint: Recommendations
@app.post("/api/recommendations/")
def recommend_plans(user: UserRequest, top_n: int = 3):
    if user.user_id not in user_product_matrix.index:
        return {"user_id": user.user_id, "recommendations": []}
    
    # Cosine similarity
    from sklearn.metrics.pairwise import cosine_similarity
    sim_scores = cosine_similarity(user_product_matrix.loc[[user.user_id]], user_product_matrix)[0]
    sim_df = pd.Series(sim_scores, index=user_product_matrix.index).sort_values(ascending=False)
    top_users = sim_df.index[1:4]  # top 3 similar users
    
    # Collect recommended plans
    sub_features = subscriptions[['User Id', 'Product Id']]
    recommended = sub_features[sub_features['User Id'].isin(top_users)]
    user_plans = sub_features[sub_features['User Id'] == user.user_id]['Product Id']
    recommended = recommended[~recommended['Product Id'].isin(user_plans)]
    
    recommendations = recommended['Product Id'].value_counts().head(top_n).index.tolist()
    
    return {"user_id": user.user_id, "recommendations": recommendations}