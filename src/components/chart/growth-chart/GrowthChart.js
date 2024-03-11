import React from "react";
import ReactApexChart from "react-apexcharts";

const GrowthChart = ({ options, series }) => {
  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default GrowthChart;
