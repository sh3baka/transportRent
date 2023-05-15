import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterModal.css';

function RegisterModal({ onClose, onSuccessfulRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'user' })
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('Registered successfully', data);
        setError('');
        localStorage.setItem('token', data.token);
        onSuccessfulRegister();
        onClose();
        navigate('/');
      } else {
        console.log('Registration failed');
        setError(data.message || 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="modal-overlay" >
      <div className="modal">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Register</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RegisterModal;
