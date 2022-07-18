import Inputs from "./Inputs";
import Forecast from "./Forecast";
import getFormattedWeatherData from "./service/weather";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hourly from "./HourlyData";
import './main.css';
import CurrentTemp from "./Current";
import TempDetails from "./TempDetail";
import Suntime from "./Suntime";
import Sungraph from "./Sungraph";
import debounce from "lodash.debounce";
import { useCallback } from "react";

function Main() {
    const [query, setQuery] = useState(null);
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);


    const getData = async () => {
        await getFormattedWeatherData({ ...query, units }).then((data) => {
            toast.success(
                `Successfully fetched weather for ${data.name}, ${data.country}.`
            );

            setWeather(data);
        });
    }

    const debounceChange = useCallback(debounce(getData, 1000), [])

    useEffect(() => {
        const fetchWeather = async () => {
            const message = query?.q ? query.q : "current location.";

            if (!query) {
                toast.info("Fetching location.");
                navigator.geolocation.getCurrentPosition((position) => {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;

                    setQuery({
                        lat,
                        lon,
                    });
                    console.log(query);
                });
            } else {
                toast.info("Fetching weather for " + message);
                await getData();
                // await getFormattedWeatherData({ ...query, units }).then((data) => {
                //     toast.success(
                //         `Successfully fetched weather for ${data.name}, ${data.country}.`
                //     );

                //     setWeather(data);
                // });
            }
        };

        fetchWeather();

    }, [query, units, debounceChange]);




    return (
        <div>
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} debounceChange={debounceChange} />

            {weather && (
                <>
                    <div>
                        <Forecast title="daily forecast" items={weather.daily} />
                    </div>
                    <div className="forecast-data">
                        <CurrentTemp weather={weather} />
                        <Hourly items={weather.hourly} />
                        <TempDetails weather={weather} />
                        <Suntime weather={weather} />
                        <Sungraph weather={weather} />
                    </div>
                </>
            )}

            <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
        </div>
    );
}

export default Main;
