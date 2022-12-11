import React, { createContext, useState, useEffect, useContext } from 'react'

const Crypto = createContext();

const CurrencyContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(()=>{
    if(currency === "INR") {
      setSymbol("₹")
    }
    if(currency === "USD") {
      setSymbol("$")
    }
  },[currency]);

  return (
    <Crypto.Provider value={{currency, setCurrency, symbol}}>
      {children}
    </Crypto.Provider>
  )
  }

export default CurrencyContext;

export const CryptoState = () => {
  return useContext(Crypto);
};