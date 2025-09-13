import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard";
import Plans from "./Pages/Plans";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </Router>
  );
};

export default App;
