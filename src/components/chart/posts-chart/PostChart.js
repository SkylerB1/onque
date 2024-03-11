import React from "react";
import ReactApexChart from "react-apexcharts";


const PostChart = ({ options, series }) => {
  return <Chart options={options} series={series} type="donut" width="400" />;
};

export default PostChart;
