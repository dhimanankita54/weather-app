import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "./service/weather";
import './WeekDay.css';
import ReactApexChart from "react-apexcharts";

function Sungraph({
    weather: {
        sunrise,
        sunset,
        timezone
    }
}) {

    var rise = formatToLocalTime(sunrise, timezone, "hh:mm a");
    var set = formatToLocalTime(sunset, timezone, "hh:mm a");

    var graph = {
        series: [{
            name: "Temperature",
            data: [0, 10, 0]
        }],
        options: {
            chart: {
                type: 'area',
                height: 150,
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
            labels: [rise, "2:00PM", set],
            yaxis: {
                opposite: false,
                axisTicks: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                labels: {
                    show: false
                },
            },
            legend: {
                horizontalAlign: 'left'
            },
            tooltip: {
                enabled: false
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#FFEBEE',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            }
        },

    }

    return (
        <div className="sun-graph">
            <ReactApexChart options={graph.options} series={graph.series} type="area" height={250} />
        </div>
    )
}

export default Sungraph;