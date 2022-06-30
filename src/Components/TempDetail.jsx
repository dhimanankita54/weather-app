import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "./service/weather";
import './main.css';

function TempDetails({
    weather: {
        humidity,
        pressure
    }
}) {

    return (
        <div className="temp-detail">
            <div className="pressure">
                <h3>Pressure</h3>
                <p>{pressure} hPa</p>
            </div>
            <div className="humidity">
                <h3>Humidity</h3>
                <p>{humidity}%</p>
            </div>
        </div>
    )
}

export default TempDetails;