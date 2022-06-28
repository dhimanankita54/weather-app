import React from 'react';
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";
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
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
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

    var graph = {
        options: {
            series: [{
                name: 'series2',
                data: chartTemp
            }],
            chart: {
                height: 150,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                // type: 'datetime',
                categories: chartTime
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        }
    }

    console.log(graph.options.series)
    console.log(chartTemp)


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
                <Chart
                    options={graph.options}
                    series={graph.options.series}
                    width="750"
                    type='line'
                />

            </div>
        </div >
    )
}