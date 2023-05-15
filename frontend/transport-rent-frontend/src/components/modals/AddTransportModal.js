import React, { useState, useEffect } from 'react';
import './AddTransportModal.css';

function AddTransportModal({ onClose, onSuccessfulAdd }) {
    const [type, setType] = useState('car');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [baseLocation, setBaseLocation] = useState('Riga');
    const [image, setImage] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [seats, setSeats] = useState('');
    const [transmission, setTransmission] = useState('Automatic');
    const [fuelType, setFuelType] = useState('Petrol');


    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const transportData = {
            type,
            brand,
            model,
            owner: getUserIdFromToken(),
            baseLocation,
            image,
            rentalPrice,
            seats,
            transmission,
            fuelType,
            reservations: []
        };

        console.log(transportData)
        try {
            const response = await fetch('http://localhost:5000/transports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(transportData),
            });

            if (response.status === 201) {
                onSuccessfulAdd();
                onClose();
            } else {
                console.error('Failed to add transport');
            }
        } catch (error) {
        }
    }

    return (
        <div className="add-transport-modal">
            <div className="modal-content">
                <h2>Add Transport</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="type">Type</label>
                        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="car">Car</option>
                            <option value="motorcycle">Motorcycle</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="model">Model</label>
                        <input
                            type="text"
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="baseLocation">Base Location</label>
                        <select
                            id="baseLocation"
                            value={baseLocation}
                            onChange={(e) => setBaseLocation(e.target.value)}
                        >
                            <option value="Riga">Riga</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="rentalPrice">Rental Price</label>
                        <input
                            type="number"
                            id="rentalPrice"
                            value={rentalPrice}
                            onChange={(e) => setRentalPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="seats">Seats</label>
                        <input
                            type="number"
                            id="seats"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="transmission">Transmission</label>
                        <select
                            id="transmission"
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                        >
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fuelType">Fuel Type</label>
                        <select
                            id="fuelType"
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>
                    <button type="submit">Add</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );

}


export default AddTransportModal;