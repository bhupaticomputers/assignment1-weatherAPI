import Search from "./components/search/search";
import "./App.css";
import { useState } from "react";
import WeatherCard from "./components/weather-card/weather-card";
import { wUrl, wApiId, wAuth, auth, url } from "./components/weather-card/api";

function App() {

  const [cityCards, setCityCards] = useState([]);

  const handleOnSearchChange = (searchData) => {
    let cityCard = {
      city: '',
      cityPhoto: '',
      weather: '', 
      icon: '',
      temp: '',
      windSpeed: '',
      humidity: '',
    }
    const cityName = searchData.label.split(',')[0];
    const [lat, lon] = searchData.value.split(' ');

    try {

      fetch(
        `${wUrl}?lat=${lat}&lon=${lon}&appid=${wApiId}&units=metric`,
        wAuth
      )
        .then((response) => response.json())
        .then((resp) => {
          cityCard = {
            city: cityName,
            weather: resp?.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${resp?.weather[0].icon}@2x.png`,
            temp: Math.round(resp?.main.temp) + "°",
            windSpeed: resp?.wind.speed,
            humidity: resp?.main.humidity,
          }
        })
        .then(()=>{
          fetch(
            `${url}?query=${cityName}&per_page=1`,
            auth
          )
            .then((response) => response.json())
            .then((resp) => {
              cityCard.cityPhoto = resp.photos[0].src.large;
            })
            .then (()=> {
              setCityCards([
                cityCard,
                ...cityCards,
              ])
            })
        })
        
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <div className="cards-container">{cityCards.map((cityData, ind) => {
        return <WeatherCard key={ind} city={cityData} />
      })}
      </div>
    </div>
  );
}
export default App;