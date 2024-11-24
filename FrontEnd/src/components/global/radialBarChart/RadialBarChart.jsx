import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function RadialBarChart({ values, labels, colors, height, width, centered = true }) {
    const series = values;
    const options = {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 360,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: { show: true },
                    value: { show: false }
                },
            }
        },
        colors: colors,
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    };
    return (
        <div>
            <ReactApexChart options={options} series={series} type="radialBar" height={height || 385} width={width} className={`${centered ? 'flex justify-center' : null}`} />
        </div>
    )
}