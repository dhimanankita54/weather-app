import { useState, useEffect } from "react";
import DisplayWeather from "./Display";
import './search.css';
import { IoLocationSharp } from "react-icons/io5";
import UpcomingWeatherCardContainer from "./weekweather";
import { Line } from "react-chartjs-2";

export const Search = () => {

    const key = '00e1066df152855de0ff69878024b778';
    const [city, setcity] = useState('');
    const [data, setdata] = useState([]);
    const [uptemps, settemps] = useState('');

    async function weatherData(e) {
        e.preventDefault();
        if (city === "") {
            alert("Add values");
        } else {
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
            )
                .then((res) => res.json())
                .then((data) => data);

            setdata({ data: data });
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('enter press here! ')
            weatherData(e)
        }
    }


    const getUpcomingTempForGraph = temps => {
        settemps(temps)
    }

    return (
        <div>
            <img className="location" src="https://cdn-icons-png.flaticon.com/128/484/484167.png" />
            <input
                className="input"
                type='text'
                placeholder='Enter Location'
                value={city}
                onChange={(e) => setcity(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
            />

            {data.data !== undefined ? (
                <div>
                    <UpcomingWeatherCardContainer location={city} />
                    <DisplayWeather data={data.data} />
                </div>
            ) : null}

        </div>
    )
}