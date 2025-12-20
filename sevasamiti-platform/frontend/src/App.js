import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage'; // Import the new donate page
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler'; // Import the new handler


import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

// Simplified ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout component to include Navbar and Footer
const Layout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <div style={{ flex: 1 }}> {/* Main content area */}
      <Outlet />
    </div>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (without Navbar and Footer) */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* Protected Routes (with Navbar and Footer) */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} /> {/* Add donate route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
