import React from "react";
import { Line } from "react-chartjs-2";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: {}
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.upcomingTemps !== prevProps.upcomingTemps) {
      let temps = [];
      let times = [];
      let upcomingTemps = this.props.upcomingTemps;
      for (var i = 0; i < upcomingTemps.length; i++) {
        temps.push(Math.round(upcomingTemps[i].temp));
        times.push(this.getDayTime(upcomingTemps[i].time * 1000));
      }

      this.setState({
        graphData: {
          labels: times,
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
              data: temps
            }
          ]
        }
      });
    }
  }

  getDayTime = data => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      weekday: "short",
      hour: "2-digit"
    }).format(data);
  };

  render() {
    return (
      <div className="graphContainer">
        <Line
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
        />
      </div>
    );
  }
}

export default LineGraph;
