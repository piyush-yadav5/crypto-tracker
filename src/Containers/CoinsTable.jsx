import { LinearProgress, Container } from '@mui/material'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../App';
import { CoinList } from '../Config/api';
import { CryptoState } from '../CurrencyContext';
import Pagination from './Pagination';

const CoinsTable = ({search}) => {


    const { currency, symbol } = CryptoState();

    const [loading, setLoading] = useState(false);

    const [coins, setCoins] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [dataPerPage] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            const { data } = await axios.get(CoinList(currency));
            setCoins(data);
            setLoading(false);
        }
        fetchCoins();
    }, [currency])

    const handleSearch = (search) => {
        return coins.filter(
            (coin) =>
                (coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
            );
    };

    const paginate = (pgNumber) => {
        setCurrentPage(pgNumber);
    }

    const indexOfLastPage = currentPage * dataPerPage;
    const indexOfFirstPage = indexOfLastPage - dataPerPage;

    const renderTable = (search) => (
        handleSearch(search).slice(indexOfFirstPage, indexOfLastPage).map((coin)=>{
            const change = coin.price_change_percentage_24h;
            let profit = false;
            if(change>0){profit = true;}
            return(
                <tr className="cursor-pointer hover:scale-105 hover:translate-x-6 hover:rounded-lg hover:bg-hoverBackground transition-all" onClick={()=>navigate(`/coins/${coin.id}`)}>
                    <td  className="flex gap-x-16 mb-8 mt-4 pl-4">
                    <img src={coin.image} alt={coin.name} className="h-14" />
                    <div className="flex flex-col">
                    <span className="text-white uppercase font-Montserrat text-xl font-semibold">{coin.symbol}</span>
                    <span className="text-white font-Montserrat text-lg">{coin.name}</span>
                    </div>
                    </td>
                    <td >
                       <span className="text-white font-Montserrat text-lg"> {symbol }{numberWithCommas(coin.current_price.toFixed(2))} </span>
                    </td>
                    <td >
                        {profit ? <span className="text-green text-xl font-Montserrat">+{change}%</span>
                        : <span className="text-red text-xl font-Montserrat">{change}%</span>}
                    </td>
                    <td >
                        <span className="text-white font-Montserrat text-lg">{symbol } {numberWithCommas(
                            coin.market_cap.toString().slice(0, -6)
                          )}
                          M </span>
                    </td>
                </tr>
            );
        })
    )
    return (
            <Container>
            <div className="overflow-x-hidden relative sm:rounded-lg">
                {loading ? <LinearProgress className="bg-gold" />
                    :
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-40">
                        <thead className="bg-gold text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg">Coin</th>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg">Price</th>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg">24h Change</th>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg">Market Value</th>
                            </tr>
                        </thead>
                        <tbody>
                                {renderTable(search)}
                        </tbody>
                    </table>
                }

            </div>
            <Pagination totalCount={(coins.length/10).toFixed(0)} paginate={paginate} />
        </Container>
    )
}

export default CoinsTable


