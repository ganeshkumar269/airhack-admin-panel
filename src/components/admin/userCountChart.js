import React from 'react';
import { Line } from 'react-chartjs-2';

// const url = "https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/usercount"
const url = "https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/usercountdetails?website_id=12233"

const data = {
  labels: [1,2,3,4,5,6],
  datasets: [
    {
      label: 'Number of Users',
      data: [5,7,10,11,13,17],
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


const userCount = async ()=>{
    const d = await fetch(url)
    const data_json = await d.json()   
    let labels = []
    let datas = []
    let cnt = 0;
    data_json.data.forEach(el=>{
        labels.push(cnt)
        cnt++
        datas.push(el)
    })
    console.log(labels,datas)
    data.labels = labels
    data.datasets[0].data = datas
}


const LineChart = () => {
    
    // userCount()
    // .then(d=>{
    //     console.log("userCount resolved")
        return (
        <>
            <h3>Number of users using your site</h3>
            <Line data={data} options={options} />
        </>
        )
    // })
}

export default LineChart;