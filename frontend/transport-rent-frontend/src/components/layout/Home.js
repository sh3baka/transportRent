import React, { useState, useEffect } from 'react';
import SearchBox from '../SearchBox';
import TransportCard from '../transport/TransportCard';
import './Home.css';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  useEffect(() => {
    console.log('searchResults updated:', searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log('searchResults updated:', searchResults);
  }, [searchResults]);

  const handleSearchBoxData = (data) => {
    setSearchResults(data.results);
    setFilterStartDate(data.startDate);
    setFilterEndDate(data.endDate);
  };

  return (
    <main className="main">
      <SearchBox setSearchResults={handleSearchBoxData} />
      <div className="transport-cards-container">
        {searchResults.map((transport) => (
          <TransportCard
            key={transport._id}
            transport={transport}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
          />
        ))}
      </div>
      <h1>Discover Your Next Adventure with Our Premium Transport Rentals</h1>
      <p>Welcome to our premier transport rental platform, where we strive to provide you with the finest selection of cars and motorcycles to elevate your travel experiences. Explore a world of possibilities and embark on unforgettable journeys with our meticulously maintained and diverse fleet of vehicles.</p>

      <p>Whether you're planning a weekend getaway, a business trip, or a road trip with friends, our exceptional service guarantees a seamless and stress-free rental experience. Choose from an extensive range of luxury, sports, and economy vehicles that cater to all tastes and budgets.</p>

      <p>Reserve your dream ride today and unlock the freedom to discover new horizons. With our convenient pick-up and drop-off locations, flexible booking options, and exceptional customer support, your perfect adventure is just a few clicks away.</p>

      <p>Don't just travel – explore the world in style with our premium transport rentals!</p>

    </main>
  );
}

export default Home;
