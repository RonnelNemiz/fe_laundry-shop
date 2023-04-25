// import React, {useState} from 'react';
// import ReactApexChart from 'react-apexcharts';

// function ChartReviews() {
//   const [state, setState] = useState({
//     series: [{
//       name: "STOCK ABC",
//       data: series.monthDataSeries1.prices
//     }],
//     options: {
//       chart: {
//         type: 'area',
//         height: 350,
//         zoom: {
//           enabled: false
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         curve: 'straight'
//       },
      
//       title: {
//         text: 'Fundamental Analysis of Stocks',
//         align: 'left'
//       },
//       subtitle: {
//         text: 'Price Movements',
//         align: 'left'
//       },
//       labels: series.monthDataSeries1.dates,
//       xaxis: {
//         type: 'datetime',
//       },
//       yaxis: {
//         opposite: true
//       },
//       legend: {
//         horizontalAlign: 'left'
//       }
//     },
  
  
//   })
   

//   return (
//     <div className="container">
//       <h1>Chart</h1>
//       <ReactApexChart options={state.options} series={state.series} type="area" height={350} width={500} />
//     </div>
//   )
// }

// export default ChartReviews;

