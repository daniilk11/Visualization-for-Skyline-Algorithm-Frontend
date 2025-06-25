// ChartComponent.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from "./Form.module.css";

function TimingResultChart({ results }) {
    // Extracting data from results object
    const labels = Object.keys(results);
    const data = Object.values(results);

    // Chart data and options
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Results',
                data: data,
                backgroundColor: 'rgba(75,192,192,0.2)', // Bar color
                borderColor: 'rgba(75,192,192,1)', // Bar border color
                borderWidth: 1, // Bar border width
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...data) + 1, // Setting y-axis maximum value
            },
        },
    };

    return (
        <div className={styles.HotelChartContainer}>
            <Bar data={chartData} className={ styles.HotelChart}  options={chartOptions} />
        </div>
    );
}

export default TimingResultChart

