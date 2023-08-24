import { Children, createContext, useEffect } from "react";
import { useState } from "react";
export const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"]);
    useEffect(() => {
        localStorage.setItem("watchList", watchList)
    }, [watchList])
    const addStock = (stock) => {
        if (watchList.indexOf(stock) == -1) {
            setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        const detedList = watchList.filter((ele) => {
            return ele != stock
        })
        setWatchList(detedList)
    }
    return <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
        {props.children}
    </WatchListContext.Provider>

}