// pages/chart.js
import React from "react";
import BalanceChart from "./BalanceChart";

const ChartPage = () => {
  const options = {
    chart: {
      id: "mixed-chart",
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
      <BalanceChart options={options} series={series} />
    </div>
  );
};

export default ChartPage;
