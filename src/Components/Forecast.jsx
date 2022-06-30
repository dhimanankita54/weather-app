import React from "react";
import { iconUrlFromCode } from "./service/weather";
import './WeekDay.css'

function Forecast({ title, items }) {
    console.log(items);
    return (
        <div>
            <div className="week-day flex flex-row items-center justify-between text-white">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className=" flex-col items-center justify-center"
                    >
                        <p className="font text-sm">{item.title}</p>
                        <p className="font">{`${item.temp.toFixed()}°`}</p>
                        <img
                            src={iconUrlFromCode(item.icon)}
                            className="w-12 my-1"
                            alt=""
                        />

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
