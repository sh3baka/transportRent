import React, { useEffect, useState } from 'react';
import TransportCard from '../transport/TransportCard';
import './Cars.css';

function Motorcycles() {
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await fetch('http://localhost:5000/transports');
        const data = await response.json();
        const motorcycles = data.filter(transport => transport.type === 'motorcycle')
        setTransports(motorcycles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransports();
  }, []);

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

  function removeTransportFromState(id) {
    setTransports(transports.filter(transport => transport._id !== id));
  }

  const isAdmin = getUserRoleFromToken() === 'admin';

  return (
    <main className="main">
      <h1>Welcome to our Motorcycles section</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae est sed magna bibendum posuere ac euismod nulla. Pellentesque vulputate purus id eros posuere faucibus.</p>
      <div className="transport-list">
        {Array.isArray(transports) && transports.map((transport) => (
          <TransportCard key={transport._id} transport={transport} isAdmin={isAdmin} onDelete={removeTransportFromState} />
        ))}
      </div>
    </main>
  );
}

export default Motorcycles;
