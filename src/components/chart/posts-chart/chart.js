// pages/chart.js
import React from "react";
import PostChart from "./PostChart";

const ChartPage = () => {
  const options = {
    chart: {
      id: "donut-chart", // Change the chart ID
      toolbar: {
        show: false, // Disable toolbar
      },
    },
    labels: [
      "Reposts",
      "Replies",
      "Original",
    ],
  };

  const series = [30, 10, 5];

  return (
    <div>
      <PostChart options={options} series={series} />
    </div>
  );
};

export default ChartPage;
