import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import DashboardLayout from "./layout/DashboardLayout";
import CategoryManagement from "./pages/CategoryManagement";
import ProfileSettings from "./pages/ProfileSettings";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/transactions" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route
              path="category-management"
              element={<CategoryManagement />}
            />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
