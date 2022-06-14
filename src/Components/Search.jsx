import { useState, useEffect } from "react";
import DisplayWeather from "./Display";
import './search.css'

export const Search = () => {

    const key = '00e1066df152855de0ff69878024b778';
    const [city, setcity] = useState('');
    const [data, setdata] = useState([]);

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

    const handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            console.log('enter press here! ')
            weatherData(e)
          }
    }

    return (
        <div>
            <input
                className="input"
                type='text'
                placeholder='Enter Location'
                value={city}
                onChange={(e) => setcity(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
            />
            <button>Submit</button>

            {data.data !== undefined ? (
                <div>
                    <DisplayWeather data={data.data} />
                </div>
            ) : null}

        </div>
    )
}