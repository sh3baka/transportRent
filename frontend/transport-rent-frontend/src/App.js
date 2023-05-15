import React from 'react';
import Header from './components/layout/Header.js';
import Home from './components/layout/Home.js';
import About from './components/layout/About.js';
import Footer from './components/layout/Footer.js';
import Motorcycles from './components/layout/Motorcycles.js';
import Cars from './components/layout/Cars.js';
import Orders from './components/layout/Orders.js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/motorcycles" exact element={<Motorcycles />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
