import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favs')) || []);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('hist')) || []);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites));
    localStorage.setItem('hist', JSON.stringify(history));
  }, [favorites, history]);

  const toggleFavorite = (city) => {
    setFavorites(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]);
  };

  const addToHistory = (city) => {
    if (!city) return;
    setHistory(prev => [city, ...prev.filter(c => c !== city)].slice(0, 5));
  };

  return (
    <WeatherContext.Provider value={{ favorites, history, toggleFavorite, addToHistory }}>
      {children}
    </WeatherContext.Provider>
  );
};