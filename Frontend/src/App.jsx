import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import Plans from "./Pages/Plans";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Welcome Home</h2>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </>
  );
}

export default App;
