import React from 'react';
import ReactApexChart from "react-apexcharts"

const BalanceChart = ({ options, series }) => {
  return (
    <div>
         <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  )
}

export default BalanceChart