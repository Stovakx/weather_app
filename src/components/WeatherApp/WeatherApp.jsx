import { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';

export default function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [tempUnits, setTempUnits] = useState('F');

  // Přepínání mezi imperial a metric
  const toggleTempUnit = () => {
    const newTempUnits = tempUnits === 'F' ? 'C' : 'F';
    setTempUnits(newTempUnits);
    searchLocation(newTempUnits); // Aktualizace po změně jednotek
  };

  const searchLocation = (newTempUnits = tempUnits) => {
    if (location.trim() === '') {
      return;
    }

    const unitsParam = newTempUnits === 'F' ? 'imperial' : 'metric';
    const updatedWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitsParam}&appid=ab9e85a1335be4935928ed2dc11c9a55`;

    axios.get(updatedWeatherURL).then((response) => {
      setData(response.data);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  useEffect(() => {
    if (location && location.trim() !== '' && location.endsWith('\n')) {
      searchLocation();
    }
  }, [location]);


  return (
    <div className="card">
      <div className="searchDiv">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Zadejte lokaci"
        />
        <button onClick={toggleTempUnit}>Změna jednotek</button>
      </div>
      <div className='header'>
        <div className='location'>
          <p>{data.name}</p>
        </div>
        <div className='temp'>
          {data.main ? <h1>{tempUnits === 'F' ? `${data.main.temp.toFixed()}°F` : `${data.main.temp.toFixed()}°C`}</h1> : null}
        </div>
        {data.weather ? (
        <div className='description'>
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png` } alt="weather icon" /> <p> {data.weather[0].description}</p>
        </div>
        ) : null}
      </div>
      {data.main && data.weather ? (
        <div className='bottom'>
          <div className='feelsTemp'>
            <p>
              {tempUnits === 'F'
                ? `${data.main.feels_like.toFixed()}°F`
                : `${data.main.feels_like.toFixed()}°C`}
            </p>
            <p>Pocitová teplota</p>
          </div>
          <div className='Humidity'>
            <p>{data.main.humidity}%</p>
            <p>Vlhkost</p>
          </div>
          <div className='wind'>
            <p>
              {tempUnits === 'F'
                ? `${data.wind.speed} MPH`
                : `${data.wind.speed} m/s`}
            </p>
            <p>Rychlost větru</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
