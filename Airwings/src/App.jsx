import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/RegisterModal';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === 'admin' && currentPage === 'home') {
      setCurrentPage('admin');
    }
  }, [user, currentPage]);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const handleSearchClick = () => {
    setCurrentPage('flights');
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onHomeClick={handleHomeClick}
      />
      
      {currentPage === 'home' && !user && (
        <HomePage
          onSearchClick={handleSearchClick}
          onSignInClick={handleLoginClick}
        />
      )}
      
      {currentPage === 'flights' && (
        <FlightsPage onLoginClick={handleLoginClick} />
      )}
      
      {user && user.role === 'admin' && (
        <AdminDashboard />
      )}
      
      {user && user.role === 'passenger' && currentPage === 'home' && (
        <HomePage
          onSearchClick={handleSearchClick}
          onSignInClick={handleLoginClick}
        />
      )}
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleRegisterClick}
      />
      
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleLoginClick}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;