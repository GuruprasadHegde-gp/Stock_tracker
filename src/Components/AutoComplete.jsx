import React, { useContext, useEffect, useState } from "react";
import Finhub from "../apis/Finhub";
import { WatchListContext } from "../context/WatchListContext";

const Autocomplete = () => {
    const [search, setSearch] = useState("")
    const [res, setRes] = useState([])
    const { addStock } = useContext(WatchListContext)


    const renderDropdown = () => {
        if (search.length > 0) {
            return (
                <ul className="dropdown-menu-show">

                    <ul style={{
                        height: "500px",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        cursor: "pointer",
                        
                    }} className="dropdown-menu-show">
                        {res.map((stock) => {

                            return (
                                <li onClick={() => {
                                    addStock(stock.symbol)
                                    setSearch("");
                                }
                                } key={stock.symbol} className="dropdown-item">
                                    {stock.description}
                                    ( {stock.symbol})
                                </li>
                            )
                        })}
                    </ul>

                </ul>
            )
        }
        else {
            return null;
        }
    }
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await Finhub.get("/search", {
                    params: {
                        q: search
                    }
                })
                if (isMounted) {
                    setRes(response.data.result)
                }

            } catch (error) {
                console.log(error);
            }

        }

        if (search.length > 0)
            fetchData();
        else
            setRes([]);

        return (() => { return isMounted = false })
    }, [search])
    return (

        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating-dropdown">
                <input style={{ backgroundColor: "rgba(145,158,171,0.4)" }} id="search" type="text" className="form-control" placeholder="Search stocks" autoComplete="off" onChange={(e) => setSearch(e.target.value)} value={search}></input>
                {renderDropdown()}
            </div>

        </div>
    )

}

export default Autocomplete;