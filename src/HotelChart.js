import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import styles from "./Form.module.css";

function HotelChart(props) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if(!props.data || !props.data.length) return;
        const data = props.data;
        const firstSelecter = props.firstSelecter;
        const secondSelecter = props.secondSelector;
        console.log(secondSelecter)

        const chartData = {
            datasets: [
                {
                    label: 'Best Hotels',
                    data: data.map((hotel) => ({ x: hotel[firstSelecter], y: hotel[secondSelecter], name: hotel.hotel_name })),
                    pointBackgroundColor: '#FF6384',
                },
            ],
        };

        const chartOptions = {
            scales: {
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Price',
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                return '$' + value;
                            },
                        },
                        type: 'linear',
                        position: 'bottom',
                    },
                ],
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Rating',
                        },
                        ticks: {
                            beginAtZero: true,
                        },
                        type: 'linear',
                        position: 'left',
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        const hotel = data.datasets[0].data[tooltipItem.index];
                        return `${hotel.name}: $${hotel.x}, Rating: ${hotel.y}`;
                    },
                },
            },
            plugins: {
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'xy',
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                },
            },
        };

        const chart = new Chart('myChart', {
            type: 'scatter',
            data: chartData,
            options: chartOptions,
        });

        setChartData(chart);

        return () => {
            chart.destroy();
        };
    }, [props.data, props.firstSelecter, props.secondSelecter]);

    return (
        <div className={styles.HotelChartContainer}>
            <canvas id="myChart"   className={chartData ? styles.HotelChart : styles.HotelChartShow} ></canvas>
        </div>
    );
}





export default HotelChart;
