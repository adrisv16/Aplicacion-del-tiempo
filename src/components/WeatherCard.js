import React from 'react';
import { Star, MapPin } from 'lucide-react';

const WeatherCard = ({ data, isFavorite, onToggleFavorite, onViewDetails }) => (
  <div className="p-8 rounded-3xl border border-[#688EA6]/20 bg-[#151E26] shadow-2xl animate-fadeIn">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-4xl font-light flex items-center gap-3">
          <MapPin className="text-[#688EA6]" /> {data.name}
        </h2>
        <p className="text-[#688EA6] uppercase tracking-widest text-sm mt-1">
          {data.weather[0].description}
        </p>
      </div>
      <button onClick={onToggleFavorite} className="transition-transform hover:scale-110">
        <Star size={32} fill={isFavorite ? "#F2CB07" : "none"} color={isFavorite ? "#F2CB07" : "#688EA6"} />
      </button>
    </div>

    <div className="my-10 flex flex-col items-center">
      <span className="text-8xl font-thin text-[#F2CB07]">
        {Math.round(data.main.temp)}°
      </span>
      <div className="flex gap-6 mt-4 text-[#688EA6]">
        <span>Humedad: {data.main.humidity}%</span>
        <span>Viento: {data.wind.speed} m/s</span>
      </div>
    </div>

    <button 
      onClick={onViewDetails}
      className="w-full border border-[#F2CB07] text-[#F2CB07] py-4 rounded-full font-medium hover:bg-[#F2CB07] hover:text-[#151E26] transition-all duration-300"
    >
      DETALLES DEL PRONÓSTICO
    </button>
  </div>
);

export default WeatherCard;