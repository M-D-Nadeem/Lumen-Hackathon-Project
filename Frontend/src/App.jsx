import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import Plans from "./Pages/Plans";
import SubscriptionPortal from "./Components/SubscriptionPortal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Welcome Home</h2>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/subscription" element={<SubscriptionPortal />} />
      </Routes>
    </>
  );
}

export default App;
