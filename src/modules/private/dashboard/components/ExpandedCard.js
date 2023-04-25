import React from 'react';
// import CloseIcon from '@mui/icons-material/Close';
import Chart from "react-apexcharts";
// import { motion } from "framer-motion";
import "../Dash.css";


export default function ExpandedCard({ param }) {
    const data = {
        options: {
          chart: {
            type: "area",
            height: "auto",
          },
    
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.35,
          },
    
          fill: { 
            colors: ["#fff"],
            type: "gradient",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            colors: ["white"],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: true,
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z",
            ],
          },
        },
      };
    
      return (
        <div
          className="ExpandedCard"
          style={{
            background: param.color.backGround,
            boxShadow: param.color.boxShadow,
          }}
          layoutId="expandableCard"
        >
          <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
            {/* <CloseIcon onClick={setExpanded} /> */}
          </div>
            <span>{param.title}</span>
          <div className="chartContainer">
            <Chart options={data.options} series={param.series} type="area" />
          </div>
          <span>Last 24 hours</span>
        </div>
      );
}


