// Standalone page purely optional; not wired into existing router automatically.
import RecommendationWidget from '../Components/ML/RecommendationWidget.jsx';
import '../Components/ML/RecommendationWidget.css';

export default function MLDemoPage() {
  return (
    <div className="ml-demo-container">
      <h2 className="ml-demo-title">ML Demo</h2>
      <p className="ml-demo-intro">Enter a user ID to fetch churn probability and plan recommendations using the standalone ML microservice.</p>
      <RecommendationWidget />
    </div>
  );
}
