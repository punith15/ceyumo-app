import React, { useEffect } from 'react'
import Chart from 'chart.js'


const Dashboardchart = props=>{

    const chartDisplay = ()=>{
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                datasets: [{
                    label: '# of Bookings',
                    data: [12, 19, 3, 5, 2, 3,2, 3, 12, 19, 3, 5],
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    useEffect(()=>{
        chartDisplay()
    },[])

    return(
        <div>
            <canvas id="myChart"></canvas>
        </div>
    )
}

export default Dashboardchart;