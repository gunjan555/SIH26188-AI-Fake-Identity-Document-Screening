import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import Processing from './pages/Processing';
import VerificationResult from './pages/VerificationResult';
import History from './pages/History';
import HighRiskCases from './pages/HighRiskCases';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Core Operational Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/verification-result" element={<VerificationResult />} />
        <Route path="/history" element={<History />} />
        <Route path="/high-risk-cases" element={<HighRiskCases />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<Profile />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
