import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "./service/weather";
import './main.css';

function Suntime({
    weather: {
        sunrise,
        sunset,
        timezone
    }
}) {

    return (
        <div className="sun-detail">
            <div className="sunrise">
                <h3>Sunrise</h3>
                <p>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</p>
            </div>
            <div className="sunset">
                <h3>Sunset</h3>
                <p>{formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
            </div>
        </div>
    )
}

export default Suntime;