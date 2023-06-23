import React from "react";
// import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";

export default function CompactCard({ param }) {
  return (
    <div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutid="expandableCard"
      // onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <span>{param.png}</span>
        <span>P{param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </div>
  );
}
