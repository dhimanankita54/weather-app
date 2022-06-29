import { useState, useEffect } from "react";
import DisplayWeather from "./Display";
import './search.css';
import { IoLocationSharp } from "react-icons/io5";
import UpcomingWeatherCardContainer from "./weekweather";
import { Line } from "react-chartjs-2";
import { Graph } from "./DrawChart";
import { SunGraph } from "./SunTime";

export const Search = () => {

    const key = '00e1066df152855de0ff69878024b778';
    const [city, setcity] = useState('Delhi');
    const [data, setdata] = useState([]);
    const [uptemps, settemps] = useState('');
    const [mainTemp, setmainTemp] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
                setdata({ data })
                console.log(data.weather[0])
                setmainTemp(Math.round(data.main.temp))
                setIcon(data.weather[0].icon)
            });
    }, [])

    const iconurl =
        "https://openweathermap.org/img/wn/" +
        `${icon}` +
        ".png";

    const getUpComingtempsforGraph = temp => {
        settemps(temp)
    }

    return (
        <div>
            <img className="location" src="https://cdn-icons-png.flaticon.com/128/484/484167.png" />
            <input
                className="input"
                type='text'
                value={city}
                onChange={(e) => setcity(e.target.value)}
            />
            {data.data !== undefined ? (
                <>
                    <UpcomingWeatherCardContainer location={city} getUpComingtempsforGraph={getUpComingtempsforGraph} />
                    <div className="data">
                        <h1 className="main-temp">{mainTemp}<sup>o</sup></h1>
                        <img className="weather-icon" src={iconurl} alt="" srcset="" />
                        <Graph location={city} />
                        <DisplayWeather data={data.data} />
                        <SunGraph data={data.data}/>
                    </div>
                </>
            ) : null}

        </div>

    )
}