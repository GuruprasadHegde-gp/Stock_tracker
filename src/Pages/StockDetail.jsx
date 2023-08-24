import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import StockChart from "../Components/StockChart"
import { StockData } from "../Components/StockData";
import finhub from "../apis/Finhub";


const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: Number(data.c[index]).toFixed(2)
        }
    })
}
const StockDetails = () => {
    const [chartData, setChartData] = useState()
    const { symbol } = useParams();
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime() / 1000);
            let oneDay
            if (date.getDay === 6) {
                oneDay = currentTime - 2 * 60 * 60 * 24;

            }
            else if (date.getDay === 0) {
                oneDay = currentTime - 3 * 60 * 60 * 24;
            }

            else {
                oneDay = currentTime - 24 * 60 * 60;
            }
            const oneWeek = currentTime - 7 * 24 * 60 * 60;
            const oneYear = currentTime - 365 * 24 * 60 * 60;
            try {
                const responses = await Promise.all([finhub.get("/stock/candle", {
                    params: {
                        symbol: symbol,
                        from: oneDay,
                        to: currentTime,
                        resolution: 30,


                    }
                }),
                finhub.get("/stock/candle", {
                    params: {
                        symbol: symbol,
                        from: oneWeek,
                        to: currentTime,
                        resolution: 60,


                    }
                }), finhub.get("/stock/candle", {
                    params: {
                        symbol: symbol,
                        from: oneYear,
                        to: currentTime,
                        resolution: "W",


                    }
                })])
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)

                })
            } catch (err) {
                console.log(err);
            }


        }



        fetchData();
        return (() => { isMounted = false; })
    }, [symbol])



    return (
        <div>
            {chartData && (
                <div>
                    <StockChart
                        chartData={chartData}
                        symbol={symbol}
                    />
                    <StockData symbol={symbol} />
                </div>
            )}
        </div>
    )
}

export default StockDetails;