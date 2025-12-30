import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import weatherApi from '../api/weatherApi';
import { MapPin, History, X } from 'lucide-react';

const getWeatherBackground = (weatherDescription) => {
  if (!weatherDescription) return 'linear-gradient(135deg, var(--dark-bg), #151E26)'; 

  const lowerCaseDesc = weatherDescription.toLowerCase();

  if (lowerCaseDesc.includes('sol') || lowerCaseDesc.includes('despejado')) {
    return 'linear-gradient(135deg, #F2CB07, #F2A30F)'; 
  } else if (lowerCaseDesc.includes('nube') || lowerCaseDesc.includes('nublado') || lowerCaseDesc.includes('cubierto')) {
    return 'linear-gradient(135deg, #688EA6, #4A6E82)'; 
  } else if (lowerCaseDesc.includes('lluvia') || lowerCaseDesc.includes('chubasco') || lowerCaseDesc.includes('llovizna')) {
    return 'linear-gradient(135deg, #4A6E82, #3B5F7A)'; 
  } else if (lowerCaseDesc.includes('tormenta')) {
    return 'linear-gradient(135deg, #3B5F7A, #2C4A5E)'; 
  } else if (lowerCaseDesc.includes('niebla') || lowerCaseDesc.includes('bruma')) {
    return 'linear-gradient(135deg, #8C9CA6, #6D7D8B)'; 
  } else if (lowerCaseDesc.includes('nieve')) {
    return 'linear-gradient(135deg, #A8C0C9, #8FA5AE)'; 
  }
  return 'linear-gradient(135deg, var(--dark-bg), #151E26)'; 
};


const Home = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const saveToHistory = (cityName) => {
    const newHistory = [cityName, ...history.filter(item => item !== cityName)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
  };

  const handleSearch = async (e, cityOverride) => {
    if (e) e.preventDefault();
    const searchTerm = cityOverride || query;
    if (!searchTerm) return;

    try {
      const { data } = await weatherApi.get('/weather', { params: { q: searchTerm } });
      setWeather(data);
      saveToHistory(data.name);
      setQuery('');
    } catch (error) {
      alert("No se encontró la ciudad");
    }
  };

  const deleteHistoryItem = (e, city) => {
    e.stopPropagation();
    const newHistory = history.filter(item => item !== city);
    setHistory(newHistory);
    localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          className="search-input" 
          placeholder="BUSCAR CIUDAD..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
      </form>
      {history.length > 0 && (
        <div style={{ marginBottom: '40px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {history.map((city) => (
            <div 
              key={city} 
              onClick={() => handleSearch(null, city)}
              style={{ 
                background: 'rgba(104, 142, 166, 0.1)', 
                padding: '8px 15px', 
                borderRadius: '20px', 
                fontSize: '0.8rem', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(104, 142, 166, 0.2)'
              }}
            >
              <History size={14} color="var(--blue-soft)" />
              <span style={{ color: 'var(--cream-text)' }}>{city}</span>
              <X 
                size={14} 
                onClick={(e) => deleteHistoryItem(e, city)} 
                style={{ marginLeft: '5px', opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
      )}

      {weather && (
        <div 
          className="weather-card" 
          style={{ background: getWeatherBackground(weather.weather[0].description) }} 
        >
          <h2 className="city-name"><MapPin size={20} /> {weather.name}</h2>
          <p style={{color: 'rgba(255,255,255,0.7)', letterSpacing: '3px', fontSize: '0.8rem'}}>
            {weather.weather[0].description.toUpperCase()}
          </p>
          <div className="temp-main">{Math.round(weather.main.temp)}°</div>
          <button className="details-btn" onClick={() => navigate(`/city/${weather.name}`)}>
            VER PRONÓSTICO
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;