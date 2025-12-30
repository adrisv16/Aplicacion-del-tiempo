import React from 'react';

const ForecastItem = ({ day }) => (
  <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
    <p className="font-bold text-gray-600">
      {new Date(day.dt * 1000).toLocaleDateString('es', { weekday: 'short' })}
    </p>
    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} className="mx-auto" alt={day.weather[0].description || ""} />
    <p className="text-2xl font-black text-blue-900">{Math.round(day.main.temp)}°</p>
  </div>
);
export default ForecastItem;