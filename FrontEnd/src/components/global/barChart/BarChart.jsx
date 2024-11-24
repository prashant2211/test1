import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function BarChart({ values = [], colors, dates = [] }) {

    const series = values;
    const data = [
        {
            "name": "Total Deposit",
            "data": [10, 20, 30, 40, 50,62,28]
        },
        {
            "name": "Total Withdrawal",
            "data": [45, 38, 33, 28, 32, 28,60]
        }
    ]
    console.log(values)
    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
                borderRadius: 4,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['transparent']
        },
        xaxis: {
            categories: dates,
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val;
                }
            }
        },
        colors: colors,
        legend: {
            show: false
        }
    }
    return (
        <div>
            {/* <ReactApexChart options={options} series={series} type="bar" height={370} /> */}
            <ReactApexChart options={options} series={data} type="bar" height={370} />
        </div>
    )
}
