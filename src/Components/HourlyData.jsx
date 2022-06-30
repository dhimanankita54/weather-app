import React from "react";
import { iconUrlFromCode } from "./service/weather";
import './WeekDay.css';
import ReactApexChart from "react-apexcharts";

function Hourly({ items }) {

    var temp = [];
    var time = [];

    items.map((x) => {
        temp.push(x.temp)
        time.push(x.title)
    })

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

    return (
        <div className="graph">
            <ReactApexChart options={graph.options} series={graph.series} type="area" height={350} />
        </div>
    )
}

export default Hourly;