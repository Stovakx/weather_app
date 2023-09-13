import axios from 'axios';

export default function WeatherURL() {
  if ('geolocation' in navigator) {
    // Získání zeměpisné polohy uživatele
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiURL = "ab9e85a1335be4935928ed2dc11c9a55";

      // Předpokládáme, že země používá °F
      const countryUsesFahrenheit = true;

      const units = countryUsesFahrenheit ? "imperial" : "metric";

      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiURL}&units=${units}`;

      axios.get(weatherURL)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error, 'Chyba při použití URL k počasí');
        });
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

//todo 
//povolení od klienta k sdílení polohy
//


