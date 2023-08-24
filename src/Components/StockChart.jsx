import React, { useState } from 'react'
import Chart from "react-apexcharts"
const StockChart = ({ chartData, symbol }) => {
    const { day, week, year } = chartData;
    const [date, setDate] = useState("24H")
    const determinedata = () => {
        switch (date) {
            case "24H":
                return day
            case "1W":
                return week
            case "1YR":
                return year

            default:
                return day
        }
    }
    const color = determinedata()[determinedata().length - 1].y - determinedata()[0].y > 0 ? "#26C281" : "#ed3419"



    const rednerButton = (button) => {
        const classes = "btn m-1 "
        if (button == date)
            return classes + " btn-primary"
        else
            return classes + "btn-outline-primary"
    }

    const options = {
        colors: [determinedata()[determinedata().length - 1].y - determinedata()[0].y > 0 ? "#26C281" : "#ed3419"],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "Stock Data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            },


        },
        tooltip: {
            x: {
                format: "dd MMM HH:MM"
            }
        }
    }



    const series = [{
        name: symbol,
        data: determinedata()
    }]


    return (
        <div>

            <div className='mt-5 p-4 shadow-sm bg-white'>
                <Chart
                    options={options}
                    series={series}
                    type='area'
                />
            </div>
            <div>
                <button className={rednerButton("24H")} onClick={() => {
                    setDate("24H")
                }}>24H</button>
                <button className={rednerButton("1W")} onClick={() => {
                    setDate("1W")
                }}>1W</button>
                <button className={rednerButton("1YR")} onClick={() => {
                    setDate("1YR")
                }}>1YR</button>

            </div>
        </div>

    )
}

export default StockChart;