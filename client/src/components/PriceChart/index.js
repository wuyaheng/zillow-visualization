import React from "react";
import { Line } from "react-chartjs-2";

function PriceChart(props) {

  const LineChart = ({ type }) => {
    const obj = {};

      let options = {
        responsive: true,
        maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Property Price',
          },
          scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            yAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },
                ticks: {
                  stepSize: 1,
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Property Count' 
                }
            }]
        }
      };

    props.results.forEach((ele) => {
      const key = ele[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries = Object.entries(obj).map(e => [Number(e[0]),e[1]]).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Line
          data={{
            labels: entries.map((x) => x[0].toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0})),
            datasets: [
              {
                data: entries.map((x) => x[1]), 
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#3f88c5'
              },
            ],
          }}
          options={options} 
          height={240}
        />
      );

  };


  return (
        <div>
          <LineChart type="price" />
        </div>
  );
}

export default PriceChart;