import { useEffect } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const TempGraph = (props) => {

    const location = props;

    // console.log(location.location)

    const [data, setData] = useState([]);

    const getData = () => {
        const openWeatherKey = "00e1066df152855de0ff69878024b778";
        const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast";
        const urlToFetch = `${weatherUrl}?&q=${location.location
            }&APPID=${openWeatherKey}&units=metric`;

        fetch(urlToFetch)
            .then(results => {
                return results.json();
            })
            .then(d => {
                setData(d);
                // createDayForecast();
            });
    }

    useEffect(() => {
        getData()
    }, [])

    var dayforecast = data.list;
    var Temps = [];
    var i = 0;

    const getDayTime = data => {
        return new Intl.DateTimeFormat("en-US", {
            //  day: "2-digit",
            hour: "2-digit",
            weekday: "short",
        }).format(data);
    };

    dayforecast.forEach((x) => {
        i++;

        if (i <= 12) {
            Temps.push({
                temp: Math.round(x.main.temp),
                time: getDayTime(x.dt * 1000)
            })
        }

    })

    var temp = [];
    var time = [];

    for(var j = 0; j < Temps.length; j++){
        temp.push(Temps[j].temp)
        time.push(Temps[j].time)
    }

    var graph = {
        series: [{
            name: "Temperature",
            data: temp
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            labels: time,
            // xaxis: {
            //     type: 'datetime',
            // },
            yaxis: {
                opposite: false
            },
            legend: {
                horizontalAlign: 'left'
            }
        },

    }

    console.log(dayforecast)
    // console.log(temp)

    return (
        <div>
            <ReactApexChart options={graph.options} series={graph.series} type="area" height={350} />
        </div>
    )
}