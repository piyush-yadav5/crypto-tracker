import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Containers/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'

const App = () => {
  return (
    <HashRouter>
      <div className="bg-background min-h-screen pb-1">
        <Header />
        <Routes>
          <Route path='/crypto-tracker' element={<HomePage />} exact />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
