import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import weatherApi from '../api/weatherApi';

const CityDetail = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    weatherApi.get('/forecast', { params: { q: cityName } })
      .then(res => setForecast(res.data))
      .catch(() => navigate('/'));
  }, [cityName, navigate]);

  if (!forecast) return <div className="container" style={{marginTop: '100px'}}>Cargando pronóstico detallado...</div>;

  // Agrupamos el pronóstico por fecha (Día)
  const groupedData = forecast.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toLocaleDateString('es', { weekday: 'long', day: 'numeric' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(curr);
    return acc;
  }, {});

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate(-1)} className="details-btn" style={{ marginBottom: '40px' }}>
        ← VOLVER A LA CIUDAD
      </button>
      
      <h1 className="city-name" style={{ marginBottom: '10px' }}>{forecast.city.name}</h1>
      <p style={{ color: 'var(--blue-soft)', letterSpacing: '2px', marginBottom: '50px' }}>PRONÓSTICO 5 DÍAS / 3 HORAS</p>

      {Object.entries(groupedData).map(([date, hours]) => (
        <div key={date} style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h3 style={{ color: 'var(--yellow-main)', textTransform: 'capitalize', borderBottom: '1px solid rgba(104, 142, 166, 0.2)', paddingBottom: '10px' }}>
            {date}
          </h3>
          
          <div style={{ display: 'flex', overflowX: 'auto', gap: '15px', padding: '20px 0' }} className="scroll-minimal">
            {hours.map((item) => (
              <div key={item.dt} className="weather-card" style={{ padding: '15px', minWidth: '100px', flexShrink: 0 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--blue-soft)' }}>
                  {new Date(item.dt * 1000).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div style={{ fontSize: '1.8rem', color: 'var(--cream-text)', margin: '10px 0' }}>
                  {Math.round(item.main.temp)}°
                </div>
                <p style={{ fontSize: '0.6rem', color: 'var(--blue-soft)', textTransform: 'uppercase' }}>
                  {item.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CityDetail;
