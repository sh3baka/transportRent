import React, { useState } from 'react';
import './TransportCard.css';
import ReservationModal from '../modals/ReservationModal';

function TransportCard({ transport, isAdmin, onDelete, filterStartDate, filterEndDate }) {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const statusColor = {
    available: 'green',
    reserved: 'yellow',
    occupied: 'red',
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('en-GB', options);
  }

  const handleReserve = () => {
    setShowReservationModal(true);
  };

  const handleModalClose = () => {
    setShowReservationModal(false);
  };

  const handleModalReserve = async (reservationData) => {
    console.log(reservationData);
    setShowReservationModal(false);
  };

  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost:5000/transports/${transport._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting transport');
      }

      onDelete(transport._id);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="transport-card">
      <div className="transport-image">
        <img src={transport.image} alt={`${transport.brand} ${transport.model}`} />
      </div>
      <div className="transport-info">
        <h3>{transport.brand} {transport.model}</h3>
        <span>Rental Price:</span> <span>${transport.rentalPrice} per day</span>
        <span>Seats:</span> <span>{transport.seats}</span>
        <span>Transmission:</span> <span>{transport.transmission}</span>
        <span>Fuel Type:</span> <span>{transport.fuelType}</span>
        <span>Location:</span> <span>{transport.baseLocation}</span>
        {isAdmin && (
          <>
            <span>City Start:</span> <span>{transport.cityStart}</span>
            <span>City Return:</span> <span>{transport.cityReturn}</span>
          </>
        )}
        <div className="transport-card-buttons">
          <button className="transport-card-button reserve-button" onClick={handleReserve}>
            Reserve
          </button>

          {isAdmin && (
            <button className="transport-card-button delete-button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
        {showReservationModal && (
          <ReservationModal
            transport={transport}
            onClose={handleModalClose}
            onReserve={handleModalReserve}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
          />
        )}
      </div>
    </div>
  );
}

export default TransportCard;
