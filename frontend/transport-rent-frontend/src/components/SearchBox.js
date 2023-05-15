import React, { useState } from 'react';
import './SearchBox.css';

function SearchBox({ setSearchResults }) {

  const [pickupCity, setPickupCity] = useState('');
  const [returnCity, setReturnCity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [transportType, setTransportType] = useState('');

  const cities = ['Riga'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupCity,
          returnCity,
          pickupDate,
          returnDate,
          transportType,
        }),
      });

      const transports = await response.json();
      console.log('Search Results:', transports);
      setSearchResults({
        results: transports,
        startDate: pickupDate,
        endDate: returnDate,
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="pickupCity">Pick-up City:</label>
          <select
            id="pickupCity"
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
          >
            <option value="">Select Pick-up City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="pickupDate">Pick-up Date:</label>
          <input
            type="date"
            id="pickupDate"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="returnCity">Return City:</label>
          <select
            id="returnCity"
            value={returnCity}
            onChange={(e) => setReturnCity(e.target.value)}
          >
            <option value="">Select Return City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="returnDate">Return Date:</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="transportType">Transport Type:</label>
          <select
            id="transportType"
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
          >
            <option value="">Select Transport Type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBox;
