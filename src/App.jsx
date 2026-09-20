import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { VotingProvider } from './components/VotingProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import Layout from './layouts/Layout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AwardsPage from './pages/AwardsPage';
import NomineesPage from './pages/NomineesPage';
import VoteSuccessPage from './pages/VoteSuccessPage';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPlaceholder from './pages/admin/AdminPlaceholder';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <VotingProvider>
        <ScrollToTop />
        <Routes>
          {/* Main App Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="awards" element={<AwardsPage />} />
            <Route path="results" element={<ResultsPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="awards/:categoryId" element={<NomineesPage />} />
              <Route path="vote-success" element={<VoteSuccessPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Admin Routes (Unprotected for demo purposes, but typically protected) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<AdminPlaceholder title="Categories" description="Manage award categories" />} />
            <Route path="nominees" element={<AdminPlaceholder title="Nominees" description="Manage nominees and assign to categories" />} />
            <Route path="votes" element={<AdminPlaceholder title="Votes" description="View voting records and logs" />} />
            <Route path="results" element={<AdminPlaceholder title="Results" description="View detailed analytics and results" />} />
            <Route path="students" element={<AdminPlaceholder title="Students" description="Manage student registrations" />} />
            <Route path="settings" element={<AdminPlaceholder title="Settings" description="System configuration" />} />
          </Route>
        </Routes>
      </VotingProvider>
    </AuthProvider>
  );
};

export default App;
