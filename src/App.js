import React, { useState } from 'react';

import { fetchWeather } from './api/fetcher';
import './styles.css';

const App = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);
            setWeather(data)
            setQuery('');
            setBackground(data)
        }

    }

    const setBackground = (data) => {
        console.log(data)
        let image = null;
        switch (data.weather[0].main) {
            case 'Clear':
                image = 'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
                break;
            case 'Snow':
                image = 'https://images.unsplash.com/photo-1519457098796-ce557f94e179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';
                break;
            case 'Clouds':
                image = 'https://images.unsplash.com/uploads/14122598319144c6eac10/5f8e7ade?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1214&q=80';
                break;
            case 'Rain':
                image = 'https://images.unsplash.com/photo-1493314894560-5c412a56c17c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
                break;
            case 'Thunderstorm':
                image = 'https://images.unsplash.com/photo-1566996675874-f00a61522322?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1028&q=80';
                break;
            case 'Drizzle':
                image = 'https://images.unsplash.com/photo-1541919329513-35f7af297129?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
                break;
            default:
                image = 'https://images.pexels.com/photos/76969/cold-front-warm-front-hurricane-felix-76969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
                break;
        }
        document.getElementsByClassName('main-container')[0].style.backgroundImage = `url(${image})`;
    }

    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />

            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>

                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;