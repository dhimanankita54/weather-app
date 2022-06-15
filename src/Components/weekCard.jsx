import React from "react";
import WeatherIconsContainer from "./Icons/IconsContainer";
import './forecast.css';

export const UpcomingWeatherCard = props => {

    return props.fiveDayForecast.map((forecast, i) => {
        const iconUrl = "http://openweathermap.org/img/wn/" +
            `${forecast.weatherIcon}` +
            ".png";

        return (
            <div className="upcoming-weather-card" key={i}>
                <p className="day-of-week">{forecast.dayOfWeek}</p>
                <div className="temps">
                    <p className="high-temp">{Math.round(forecast.maxTemp)}°</p>
                    <p className="low-temp">{Math.round(forecast.minTemp)}°</p>
                </div>
                <img src={iconUrl} />
                <p className="desc">{forecast.weatherType}</p>
            </div>
        );
    });
};