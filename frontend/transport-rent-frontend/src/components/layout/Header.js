import React from 'react';
import './Header.css';
import LoginModal from '../modals/LoginModal.js'
import RegisterModal from '../modals/RegisterModal.js';
import AddTransportModal from '../modals/AddTransportModal.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddTransportModalOpen, setIsAddTransportModalOpen] = useState(false);

  const handleAddTransport = () => {
    setIsAddTransportModalOpen(true);
  };

  const handleCloseAddTransportModal = () => {
    setIsAddTransportModalOpen(false);
  };


  function handleLoginClick() {
    setIsLoginModalOpen(true);
  }

  function handleCloseModal() {
    setIsLoginModalOpen(false);
  }

  function handleRegisterClick() {
    setIsRegisterModalOpen(true);
  }

  function handleCloseRegisterModal() {
    setIsRegisterModalOpen(false);
  }

  const navigate = useNavigate();

  const checkToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/check-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:5000/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.status === 200) {
        console.log('Logged out successfully');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function getUserRoleFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoder = new TextDecoder('utf-8');
      const payload = JSON.parse(decoder.decode(new Uint8Array(Array.from(atob(token.split('.')[1]), c => c.charCodeAt(0)))));
      return payload.role;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  const isAdmin = getUserRoleFromToken() === 'admin';

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item"><a href="/">Home</a></li>
          {isAdmin && (
            <>
              <li className="nav-item"><a href="/cars">Cars</a></li>
              <li className="nav-item"><a href="/motorcycles">Motorcycles</a></li>
              <li className="nav-item"><a href="/orders">orders</a></li>

            </>
          )}
          <li className="nav-item"><a href="/about">About</a></li>
        </ul>
      </nav>
      <div className="nav-buttons">
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <button className="add-transport-button" onClick={handleAddTransport}>
                Add Transport
              </button>
            )}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="login-button" onClick={handleLoginClick}>Login</button>
            <button className="register-button" onClick={handleRegisterClick}>Register</button>
          </>
        )}
      </div>
      {isAddTransportModalOpen && <AddTransportModal onClose={handleCloseAddTransportModal} onSuccessfulAdd={() => { /* обработка успешного добавления */ }} />}
      {isLoginModalOpen && <LoginModal onClose={handleCloseModal} onSuccessfulLogin={() => setIsAuthenticated(true)} />}
      {isRegisterModalOpen && <RegisterModal onClose={handleCloseRegisterModal} onSuccessfulRegister={() => setIsAuthenticated(true)} />}
    </header>
  );
}

export default Header;
