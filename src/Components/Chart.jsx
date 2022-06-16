import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import LineChart from "./LineChart";

class LineGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fiveDayAPI: {},
            fiveDayForecastState: [],
            location: this.props.location,
            graphData: {}
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.location !== this.props.location) {
            this.setState(
                {
                    location: this.props.location,

                },
                this.getWeather,
            );
        }


    };

    componentDidMount = () => {
        this.getWeather();
    };

    getWeather = () => {
        // OpenWeather Info

        const openWeatherKey = "00e1066df152855de0ff69878024b778";
        const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
        const urlToFetch = `${weatherUrl}?&q=${this.state.location
            }&APPID=${openWeatherKey}&units=metric`;



        fetch(urlToFetch)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({
                    fiveDayAPI: data
                });

                this.createDayForecast();
            });
    };

    createDayForecast = () => {
        let fiveDayAPIDataList = this.state.fiveDayAPI.list;
        let fiveDayForecast = [];
        let currentDayIndex = 0;
        let upcomingTemps = [];

        for (let i = 0; i < fiveDayAPIDataList.length; i++) {
            currentDayIndex++;
            // if (currentDayIndex > 4) break;

            if (currentDayIndex <= 9) {
                upcomingTemps.push({
                    temp: Math.round(fiveDayAPIDataList[i].main.temp),
                    time: this.getDayTime(fiveDayAPIDataList[i].dt * 1000)
                });
            }
        }

        var temps = [];
        var times = [];

        for (let i = 0; i < upcomingTemps.length; i++) {
            temps.push(upcomingTemps[i].temp);
            times.push(upcomingTemps[i].time);
        }

        this.props.getUpcomingTempForGraph(upcomingTemps);
    }


    getDayTime = data => {
        return new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            hour: "2-digit",
            weekday: "short",
        }).format(data);
    };

    render = () => {
        return (
            <div className="graphContainer">
                {/* <Line
                    data={this.state.graphData}
                    options={{
                        title: {
                            display: true,
                            text: "Upcoming temperatures",
                            fontSize: 20
                        },
                        legend: {
                            display: false
                        }
                    }}
                /> */}

                
            </div>
        )
    }
}


export default LineGraph;