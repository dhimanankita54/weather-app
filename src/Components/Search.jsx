import { useState, useEffect } from "react";
import DisplayWeather from "./Display";
import './search.css';
import { IoLocationSharp } from "react-icons/io5";
import UpcomingWeatherCardContainer from "./weekweather";
import { Line } from "react-chartjs-2";
import LineGraph from "./Chart";
import { Graph } from "./DrawChart";

export const Search = () => {

    const key = '00e1066df152855de0ff69878024b778';
    const [city, setcity] = useState('Delhi');
    const [data, setdata] = useState([]);
    const [uptemps, settemps] = useState('');

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`)
            .then((res) => res.json())
            .then((data) => {
                setdata({ data })
            });
    }, [])

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
                <div>
                    <UpcomingWeatherCardContainer location={city} getUpComingtempsforGraph={getUpComingtempsforGraph} />
                    {/* <LineGraph  location={city}/> */}
                    <Graph location={city} />
                    <DisplayWeather data={data.data} />
                </div>
            ) : null}

        </div>
    )
}