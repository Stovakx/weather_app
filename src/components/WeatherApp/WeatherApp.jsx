import React, {useState,} from 'react';
import axios from 'axios';
import './WeatherApp.css'

export default function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation]= useState('');
  const [weatherURL, setWeatherURL] = useState('');
  const [tempUnits, setTempUnits]= useState('F');
  
  //přepínání mezi imperial a metric
  

  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      if (location.trim() === '') {
        return;
      }
  
      const unitsParam = tempUnits === 'F' ? 'imperial' : 'metric';
      const updatedWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitsParam}&appid=ab9e85a1335be4935928ed2dc11c9a55`;
      setWeatherURL(updatedWeatherURL);
  
      axios.get(updatedWeatherURL).then((response) => {
        setData(response.data);
      });
    }
  };

  const toggleTempUnit = () => {
    setTempUnits(tempUnits === 'F' ? 'C' : 'F');
    const unitsParam = tempUnits === 'F' ? 'imperial' : 'metric';
    const updatedWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitsParam}&appid=ab9e85a1335be4935928ed2dc11c9a55`;
  
    axios.get(updatedWeatherURL).then((response) => {
      setData(response.data);
    });
  };




  return (
    <div className='card'>
      <div className='searchDiv'>
        <input 
          value={location}
          onChange={event=> setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Zadejte lokaci'
        />
        <button onClick={toggleTempUnit}>Změna jednotek</button>
      </div>
      <div className='header'>
        <div className='location'>
          <p>{data.name}</p>
        </div>
        <div className='temp'>
          {data.main ? <h1>{tempUnits === 'F' ? `${data.main.temp.toFixed()}°C` : `${data.main.temp.toFixed()}°F`}</h1> : null}
        </div>
        {data.weather ? (
        <div className='description'>
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png` } alt="weather icon" /> <p> {data.weather[0].description}</p>
        </div>
        ) : null}
      </div>
      <div className='center'></div>
      <div className='bottom'>
        <div className='feelsTemp'>
          {data.main ? <p>{tempUnits === 'F' ? `${data.main.feels_like.toFixed()}°C` : `${data.main.feels_like.toFixed()}°F`}</p> : null}
          <p>Pocitová teplota</p>
        </div>
        <div className='Humidity'>
          {data.main ? <p>{data.main.humidity}%</p>:null}
          <p>Vlhkost</p>
        </div>
        <div className='wind'>
          {data.wind ? <p>{tempUnits === 'F' ? `${data.wind.speed} km/h` :`${data.wind.speed} MPH`} </p>:null}
          <p>Rychlost větru</p>
        </div>
      </div>
    </div>
  )
}
