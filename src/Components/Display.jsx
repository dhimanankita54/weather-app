import React, { useState } from "react";
import "./display.css";


function DisplayWeather(props) {
    const { data } = props;
    const iconurl =
        "http://openweathermap.org/img/wn/" +
        `${data.cod != 404 ? data.weather[0].icon : null}` +
        ".png";

    
        
    return (
        <div className="displayweather">
            {data.cod != 404 ? (
                <React.Fragment>
                    <div className="maincard">
                        <h1>
                            {" "}
                            {Math.floor(data.main.temp - 273.15)}
                            <sup>o</sup>
                        </h1>
                        <span className="weather-main">{data.weather[0].main}</span>
                        <img className="weather-icon" src={iconurl} alt="" srcset="" />

                    </div>
                    <div className="weatherdetails">
                        <div className="section1">
                            <div className="detail">
                                <h4>Humidity</h4>
                                <p>{data.main.humidity} %</p>
                            </div>
                            <div className="detail">
                                <h4>Sunrise</h4>
                                <p>
                                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>

                        <div className="section2">
                            <div className="detail">
                                <h4>Pressure</h4>
                                <p>{data.main.pressure} hPa</p>
                            </div>
                            <div className="detail">
                                <h4>Sunset</h4>
                                <p>
                                    {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <div className="maincard">
                    <h2>{data.message}</h2>
                </div>
            )}
        </div>
    );
}

export default DisplayWeather;