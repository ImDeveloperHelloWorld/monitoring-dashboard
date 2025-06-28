import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const UserAuthenticated: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<UserAuthenticated><Login /></UserAuthenticated>} />
      <Route path="/register" element={<UserAuthenticated><Register /></UserAuthenticated>} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
            <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
