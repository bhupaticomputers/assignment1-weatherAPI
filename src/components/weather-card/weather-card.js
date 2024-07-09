import './card.css';
import { WiHumidity } from "react-icons/wi";
import { PiWindLight } from "react-icons/pi";

function WeatherCard({ city }) {
    return <div className="card" style={{backgroundImage :`url(${city.cityPhoto})`}}>
        <div className='weather-content'>
            <h3>{city.city}</h3>
            <p>{city.weather}</p>
            <div className='w-container'>
                <img src={city.icon} className='weather-icon'></img>
                <div className="temp">{city.temp}</div>
                <div className='gap'></div>
                <div className="wind-humidity-container">
                    <PiWindLight />
                    <span className="wind">
                        {Math.round(city.windSpeed * 3.6)}<span className='km'>km/h</span>
                    </span>
                    <div></div>
                    <WiHumidity />
                    <span className="humidity">
                        {city.humidity}%
                    </span>
                </div>
            </div>
        </div>
    </div>;
}

export default WeatherCard;