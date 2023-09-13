import React, {useState,} from 'react';
import axios from 'axios';
import './WeatherApp.css'

export default function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation]= useState('');
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ab9e85a1335be4935928ed2dc11c9a55`;

  const searchLocation = (event)=>{
    if(event.key === 'Enter'){
      axios.get(weatherURL).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('');
    }
  }

  return (
    <div className='card'>
      <div className='searchDiv'>
        <input 
          value={location}
          onChange={event=> setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Zadejte lokaci'
        />
      </div>
      <div className='header'>
        <div className='location'>
          <p>{data.name}</p>
        </div>
        <div className='temp'>
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
        </div>
        <div className='description'>
        {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
      </div>
      <div className='center'></div>
      <div className='bottom'>
        <div className='feelsTemp'>
          {data.main ? <p>{data.main.feels_like.toFixed()}°F</p>:null}
          <p>Pocitová teplota</p>
        </div>
        <div className='Humidity'>
          {data.main ? <p>{data.main.humidity}%</p>:null}
          <p>Vlhkost</p>
        </div>
        <div className='wind'>
          {data.wind ? <p>{data.wind.speed} MPH </p>:null}
          <p>Rychlost větru</p>
        </div>
      </div>
    </div>
  )
}
