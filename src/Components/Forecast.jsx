import React from "react";
import getFormattedWeatherData, { iconUrlFromCode } from "./service/weather";
import './WeekDay.css'

function Forecast({ title, items }) {
    console.log(items);
    return (
        <div>
            <div className="week-day">
                {items.map((item) => (
                    <div
                        key={item.title}
                    >
                        <p className="font">{item.title}</p>
                        <p className="font">{`${item.temp.toFixed()}°`}</p>
                        <img
                            src={iconUrlFromCode(item.icon)}
                            alt=""
                            className="icon"
                        />
                        <p className="font">{item.detail}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
