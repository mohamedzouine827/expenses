"use client";
import Chart, { Tooltip } from "chart.js/auto";
import {Bar, BarChart, XAxis, YAxis } from "recharts";



function DashboardInfo({gadgetInfo} : {gadgetInfo:any}) {
  return (
    <div>
      <BarChart 
      width={900}
      height={300}
      data={gadgetInfo}
      margin={{
        top: 5,
        right: 5,
        left: 5,
        bottom:5
      }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <legend />

        <Bar dataKey="totalSpent" stackId="a" fill="#000000"/>
        <Bar dataKey="amount" stackId="a" fill="#847e87"/>

      </BarChart>
    </div>
  );
}
export default DashboardInfo