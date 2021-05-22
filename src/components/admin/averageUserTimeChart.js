import React from 'react';
import { Line } from 'react-chartjs-2';

const url = "https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/averageusertime"
const data = {
  labels: [1,2,3,4,5,6],
  datasets: [
    {
      label: 'Time Spent in Minutes',
      data: [5,4,2,8,10,6],
      fill: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const averageusertime = async ()=>{
    const d = await fetch(url)
    const data_json = await d.json()   
    let labels = []
    let datas = []
    data_json.data.forEach(el=>{
        labels.push(el.timestamp)
        datas.push(el.count)
    })
    data.labels = labels
    data.datasets[0].data = datas
}
// averageusertime()
// .then(d=>console.log("AverageUserTime resolved"))


const LineChart = () => (
  <>
    <h3>Average Time Users Spend on your site</h3>
    <Line data={data} options={options} />
  </>
);

export default LineChart;