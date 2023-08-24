import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import instance from "../apis/Finhub";
import { BsFillCaretUpFill } from "react-icons/bs"
import { BsFillCaretDownFill } from "react-icons/bs"
import { useContext } from "react";
import { WatchListContext } from "../context/WatchListContext";
const StockList = () => {
    const [stocks, setStock] = useState([])
    const { watchList, deleteStock } = useContext(WatchListContext)
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return instance.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))

                const data = responses.map((respo) => {

                    return {
                        data: respo.data,
                        symbol: respo.config.params.symbol
                    }

                })
                console.log(data);
                if (isMounted)
                    setStock(data);

            } catch (error) { console.log(error); }

        }
        fetchData();
        return () => { isMounted = false }
    }, [watchList])

    const handleStockSelect = (sym) => {
        navigate(`/detail/${sym}`);
    }

    return (
        <div>
            <table className="table hover mt-5">
                <thead style={{
                    color: "rgb(79,89,102)"
                }}>


                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Change</th>
                        <th scope="col">Change %</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Prev Close</th>
                    </tr>
                </thead>
                <tbody style={{
                    cursor: "pointer"
                }}>
                    {stocks.map((details) => {
                        return (
                            <tr onClick={() => {
                                handleStockSelect(details.symbol)
                            }} key={details.symbol} className="table-row">
                                <th scope="row">{details.symbol}</th>
                                <td>{details.data.c}</td>
                                {details.data.d > 0 ?
                                    <td className="text-success">{details.data.d} <BsFillCaretUpFill /></td>
                                    : <td className="text-danger">{details.data.dp}  <BsFillCaretDownFill /></td>}
                                {details.data.dp > 0 ?
                                    <td className="text-success">{details.data.dp}<BsFillCaretUpFill /></td>
                                    : <td className="text-danger">{details.data.dp}<BsFillCaretDownFill /></td>}
                                <td>{details.data.h}</td>
                                <td>{details.data.l}</td>
                                <td>{details.data.o}</td>
                                <td>{details.data.pc}  <button className=" btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e) => {
                                    e.stopPropagation();
                                    deleteStock(details.symbol)
                                }}>Delete</button></td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default StockList;