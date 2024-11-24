import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function PieChart({ values, labels, colors, height, width, centered = true, tooltip = true }) {
  const series = values;
  const options = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '75%',
        },
        expandOnClick: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: tooltip,
      y: {
        formatter: function (val) {
          return val + '%'; // Display value with percentage sign
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
          height: 200
        },
        legend: {
          enabled: false
        }
      }
    }],
    labels: labels, // Change the series titles here
    colors: colors, // Change the colors of the series here
    legend: {
      show: false
    }
  }
  return (
    <div>
      <ReactApexChart options={options} series={series} type="donut" height={height || 325} width={width} className={`${centered ? 'flex justify-center' : null}`} />
    </div>
  )
}