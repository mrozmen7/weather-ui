import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

import search_icon from '../assets/search1.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import sun_icon from '../assets/sun.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

function Weather() {
    const [city, setCity] = useState(''); // inputa yazılan şehir
    const [weatherData, setWeatherData] = useState(null); // API'den gelen veriler

    // Sayfa ilk yüklendiğinde otomatik olarak "London" verisi getirilsin:
    useEffect(() => {
        fetchWeather('London');
    }, []);

    // API'den hava durumu verisi çek
    const fetchWeather = async (cityName) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather/${cityName}`);
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Veri alınamadı:', error);
            setWeatherData(null);
        }
    };

    // Search butonuna tıklanınca tetiklenir
    const handleSearch = () => {
        if (city.trim() !== '') {
            fetchWeather(city);
        }
    };

    return (
        <div className="weather">
            {/* Arama alanı */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className="search-icon" onClick={handleSearch}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>

            {/* Eğer veri geldiyse göster */}
            {weatherData && (
                <>
                    <img
                        src={weatherData.iconUrl || sun_icon}
                        alt="weather"
                        className="weather-icon"
                    />
                    <p className="temperature">{weatherData.temperature}°c</p>
                    <p className="location">{weatherData.cityName}</p>

                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="humidity" />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>{weatherData.description}</span>
                            </div>
                        </div>

                        <div className="col">
                            <img src={wind_icon} alt="wind" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;