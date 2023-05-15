import React, { useState, useEffect } from 'react';
import './ReservationModal.css';
import jwt_decode from 'jwt-decode';

function ReservationModal({ transport, onClose, onReserve, filterStartDate, filterEndDate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState(filterStartDate || '');
  const [endDate, setEndDate] = useState(filterEndDate || '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setName(decodedToken.name);
      setEmail(decodedToken.email);
    }
  }, []);

  const handleModalReserve = async (reservationData) => {
    try {
      const createOrderPromise = fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          ...reservationData,
          transportId: transport._id,
          transportName: `${transport.brand} ${transport.model}`,
        }),
      });

      const reserveTransportPromise = fetch(`http://localhost:5000/transports/${transport._id}/reserve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          startDate: reservationData.startDate,
          endDate: reservationData.endDate,
          cityStart: transport.baseLocation,
          cityReturn: transport.baseLocation,
        }),
      });

      const [createOrderResponse, reserveTransportResponse] = await Promise.all([
        createOrderPromise,
        reserveTransportPromise,
      ]);

      if (!createOrderResponse.ok) {
        throw new Error('Error creating order');
      }

      if (!reserveTransportResponse.ok) {
        throw new Error('Error reserving transport');
      }

      const createdOrder = await createOrderResponse.json();
      const reservedTransport = await reserveTransportResponse.json();

      console.log('Created order:', createdOrder);
      console.log('Reserved transport:', reservedTransport);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleModalReserve({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      startDate,
      endDate,
      transportId: transport._id,
      transportName: `${transport.brand} ${transport.model}`,
    });
  };


  return (
    <div className="reservation-modal">
      <div className="reservation-modal-content">
        <h2>Reserve {transport.brand} {transport.model}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Phone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

          <button type="submit">Submit</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default ReservationModal;
