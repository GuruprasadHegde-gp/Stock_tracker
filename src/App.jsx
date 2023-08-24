import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import StockDetails from './Pages/StockDetail';
import Summary from './Pages/Summary'
import 'bootstrap/dist/css/bootstrap.min.css';
import { WatchListContextProvider } from './context/WatchListContext';


function App() {


  return (
    <div className='container'>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/detail/:symbol" element={<StockDetails />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  )

}

export default App;
