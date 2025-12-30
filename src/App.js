import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';
import weatherApi from './api/weatherApi';

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/city/:cityName" element={<CityDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WeatherProvider>
  );
}
export default App;


