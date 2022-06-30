import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "./service/weather";
import './main.css';

function TempDetails({
    weather: {
        temp,
        icon
    }
}) {

    return (
        <div className="current">
            <p className="text">{`${temp.toFixed()}°`}</p>
            <img src={iconUrlFromCode(icon)} alt="" className="temp-icon" />
        </div>
    )
}

export default TempDetails;