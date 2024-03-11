// pages/chart.js
import React from "react";
import GrowthChart from "./GrowthChart";

const ChartPage = () => {
  const options = {
    chart: {
      id: "mixed-chart",
      toolbar: {
        show: false //Disable toolbar
      }
    },
    xaxis: {
      categories:  ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
    },
  };

  const series = [
    {
      name: "Line Series",
      markers: {
        size: 1,
    },
      type: "line",
      data: [30, 40, 25, 50, 49, 21, 70, 51, 30],
    },
    {
      name: "Column Series",
      type: "column",
      data: [10, 15, 12, 8, 14, 20, 22, 18, 10],
    },
  ];

  return (
    <div>
      <h1>Line Chart</h1>
      <GrowthChart options={options} series={series} />
    </div>
  );
};

export default ChartPage;
