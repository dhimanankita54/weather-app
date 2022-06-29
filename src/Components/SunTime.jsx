import ReactApexChart from "react-apexcharts";

export const SunGraph = (props) => {

    const { data } = props;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    console.log(sunrise, sunset)

    var graph = {
        series: [{
            // name: "Temperature",
            data: [sunrise, sunset]
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
            labels: [sunrise, sunset],
            // xaxis: {
            //     type: 'datetime',
            // },
            yaxis: {
                opposite: false,
                floating: true,
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
            }
        },

    }

    return (
        <div>
            {data.cod !== 404 ?
                <div>
                    <ReactApexChart options={graph.options} series={graph.series} type="area" height={350} />
                </div>
                : null}

        </div>
    )
}