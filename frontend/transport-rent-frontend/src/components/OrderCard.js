import React from 'react';
import './OrderCard.css';

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function OrderCard({ order, onApprove, onDecline }) {
    const handleDecline = async (orderId, transportId, startDate, endDate) => {
        try {
            // Delete the order
            await fetch(`http://localhost:5000/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Remove the reservation from the transport
            await fetch(`http://localhost:5000/transports/${transportId}/removeReservation`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    startDate,
                    endDate,
                }),
            });

            onDecline(orderId);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="order-card">
            <div className="order-info">
                <h3>{order.transportName}</h3>
                <span>Name:</span> <span>{order.customerName}</span>
                <span>Email:</span> <span>{order.customerEmail}</span>
                <span>Phone:</span> <span>{order.customerPhone}</span>
                <span>Start Date:</span> <span>{formatDate(order.startDate)}</span>
                <span>End Date:</span> <span>{formatDate(order.endDate)}</span>
                <div className="order-card-buttons">
                    <button className="order-card-button approve-button" onClick={() => onApprove(order._id)}>
                        Approve
                    </button>
                    <button
                        className="order-card-button decline-button"
                        onClick={() =>
                            handleDecline(order._id, order.transportId, order.startDate, order.endDate)
                        }
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
