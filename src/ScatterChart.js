import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
// import 'chart.js/plugins/chartjs-plugin-scatter';
import styles from "./Form.module.css";

const ScatterChart = ({ df, skylineDF, param1, param2 }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if(!df || !df.length || !skylineDF || !skylineDF.length) return;
        // Create the chart using Chart.js
        const ctx = chartRef.current.getContext('2d');
        const data = {
            datasets: [
                {
                    label: 'Data Points',
                    data: df.map((point) => {
                        for(const p of skylineDF){ // slow for big data use for better visualization
                            if(p.id === point.id){
                                return null
                            }
                        }
                        return {
                            hotel_name: point.hotel_name,
                            x: point[`${param1}`],
                            y: point[`${param2}`],
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        };
                    }).filter(Boolean), //filter(Boolean) slow
                },
                {
                    label: 'Skyline Points',
                    data: skylineDF.map((point) => {
                        return{
                            hotel_name: point.hotel_name,
                            x: point[`${param1}`],
                            y: point[`${param2}`],
                            backgroundColor: 'rgba(255, 0, 0, 0.5)' ,
                            borderColor:'rgba(255, 0, 0, 1)',
                            borderWidth: 1,
                        };
                    }),
                },
            ],
        };

        const options = {
            responsive: true,
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        // return the title for the tooltip based on tooltipItem and data
                        return "Title";
                    },
                    label: function(tooltipItem, data) {
                        // return the label for the tooltip based on tooltipItem and data
                        return "Label";
                    }
                }
            },
            scales: {
                y: {
                    // type: 'logarithmic', // Set y-axis scale type to logarithmic
                    beginAtZero: true, // Set y-axis scale to start from non-zero value
                    // max: 100, // Set maximum value for y-axis
                    // grid: {
                    //     display: true // Display grid lines on y-axis
                    // }
                }
            },
            onClick: (event, chartElements) => {
                if (chartElements && chartElements.length > 0) {
                    // Handle click event on data point
                    const datasetIndex = chartElements[0].datasetIndex;
                    const dataIndex = chartElements[0].index;
                    const clickedData = scatterChart.data.datasets[datasetIndex].data[dataIndex];
                    alert(`Selected hotel is ${clickedData.hotel_name} (${clickedData.x}, ${clickedData.y})`);
                }
            }
        };

        // Create the chart instance
        const scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Best Hotels',
                    data: data.datasets[0].data, // Use x, y, and hotel name from data
                },
                {
                    label: 'Skyline',
                    data: data.datasets[1].data,
                    type: 'line', // Set chart type to line
                    fill: false, // Set fill to false to remove fill color
                    // borderColor: 'blue', // Set border color to blue
                    borderWidth: 1,
                }
                ]
            },
            options: options
        });



        return () => {
            // Clean up chart instance on unmount
            scatterChart.destroy();
        };
    }, [df,skylineDF, param1, param2]);

    return (
        <div className={styles.HotelChartContainer}>
         <canvas className={df ? styles.HotelChart : styles.HotelChartShow} ref={chartRef} />
        </div>
    );
};

export default ScatterChart;
