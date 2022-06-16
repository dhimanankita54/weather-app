import React from 'react';
import { useEffect, useState } from "react"
import * as ReactDOM from 'react-dom';
import { Line } from "react-chartjs-2";
import { PaperLineChart } from 'react-materialui-charts';
import './forecast.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const Graph = ({ location }) => {

    const [chartData, setChartData] = useState({
        apiData: {},
        time: [],
        temp: []
    })

    const [chartTime, setChartTime] = useState([]);
    const [chartTemp, setCharttemp] = useState([]);

    const getData = () => {

        const openWeatherKey = "00e1066df152855de0ff69878024b778";
        const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
        const urlToFetch = `${weatherUrl}?&q=${location
            }&APPID=${openWeatherKey}&units=metric`;



        fetch(urlToFetch)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setChartData({ ...chartData, apiData: data });

                // console.log(chartData.apiData.list)
                createDayForecast();
            });
    }

    useEffect(() => {
        getData();
    }, [])

    const createDayForecast = () => {

        let fiveDayAPIDataList = chartData.apiData.list;
        let fiveDayForecast = [];
        let currentDayIndex = 0;
        let upcomingTemps = [];

        // for (let i = 0; i < fiveDayAPIDataList.length; i++) {
        //     currentDayIndex++;
        //     // if (currentDayIndex > 4) break;

        //     if (currentDayIndex <= 9) {
        //         upcomingTemps.push({
        //             temp: Math.round(fiveDayAPIDataList[i].main.temp),
        //             time: getDayTime(fiveDayAPIDataList[i].dt * 1000)
        //         });
        //     }
        // }

        fiveDayAPIDataList.forEach((x) => {
            currentDayIndex++;
            if (currentDayIndex <= 9) {
                upcomingTemps.push({
                    temp: Math.round(x.main.temp),
                    time: getDayTime(x.dt * 1000)
                });
            }
        })

        var temps = [];
        var times = [];

        for (let i = 0; i < upcomingTemps.length; i++) {
            temps.push(upcomingTemps[i].temp);
            times.push(upcomingTemps[i].time);
        }

        setChartTime(times);
        setCharttemp(temps)

    }

    const graph = {
        labels: chartTime,
        datasets: [
            {
                label: "Degrees",
                fill: false,
                lineTension: 0.5,
                backgroundColor: "#00a9cb",
                borderColor: "#00a9cb",
                borderWidth: 0,
                pointStyle: "#00a9cb",
                radius: 8,
                hoverRadius: 10,
                data: chartTemp
            }
        ]
    }

    console.log(graph.labels, graph.datasets[0].data)


    const getDayTime = data => {
        return new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            hour: "2-digit",
            weekday: "short",
        }).format(data);
    };
    return (
        <div>
            <div className='graph'>
                <Line data={graph}
                    type="line"
                    width={160}
                    height={60}
                    options={{
                        title: {
                            display: true,
                            text: "Temperatures",
                            fontSize: 20
                        },
                        legend: {
                            display: true, //Is the legend shown?
                            position: "top" //Position of the legend.
                        }
                    }}
                />
            </div>
        </div>
    )
}