import { LinearProgress, Container } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../App';
import { CryptoState } from '../CurrencyContext';
import Pagination from './Pagination';

const CoinsTable = ({ filtered, loading }) => {


    const { symbol } = CryptoState();

    const [currentPage, setCurrentPage] = useState(1);

    const [dataPerPage] = useState(10);

    const navigate = useNavigate();

    const paginate = (pgNumber) => {
        setCurrentPage(pgNumber);
    }

    const indexOfLastPage = currentPage * dataPerPage;
    const indexOfFirstPage = indexOfLastPage - dataPerPage;

    const renderTable = () => (
        filtered.slice(indexOfFirstPage, indexOfLastPage).map((coin) => {
            const change = coin.price_change_percentage_24h;
            let profit = false;
            if (change > 0) { profit = true; }
            return (
                <tr className="cursor-pointer hover:scale-105 hover:translate-x-2 hover:drop-shadow-2xl hover:bg-hoverBackground transition-all" onClick={() => navigate(`/coins/${coin.id}`)}>
                    <td className="flex mb-8 mt-4 pl-6 pr-10 gap-5" align='left'>
                        <img src={coin.image} alt={coin.name} className="h-10 sm:h-14" />
                        <div className="flex flex-col">
                            <span className="text-white uppercase font-Montserrat text-sm sm:text-xl font-semibold">{coin.symbol}</span>
                            <span className="text-white font-Montserrat text-sm sm:text-lg">{coin.name}</span>
                        </div>
                    </td>
                    <td align='right'>
                        <span className="text-white font-Montserrat text-sm sm:text-lg "> {symbol} {" "} {numberWithCommas(coin?.current_price.toFixed(2))} </span>
                    </td>
                    <td align='right' className="pr-7">
                        {profit ? <span className="text-green text-sm sm:text-lg font-Montserrat">+{change}%</span>
                            : <span className="text-red text-sm sm:text-lg font-Montserrat">{change}%</span>}
                    </td>
                    <td align='right' className="pr-14">
                        <span className="text-white font-Montserrat text-sm sm:text-lg">{symbol} {" "} {numberWithCommas(
                            coin?.market_cap.toString().slice(0, -6)
                        )}
                            M </span>
                    </td>
                </tr>
            );
        })
    )
    return (
        <Container>
            <div className="overflow-x-auto lg:overflow-x-hidden sm:rounded-lg scrollbar-hide">
                {loading ? <LinearProgress className="bg-gold" />
                    :
                    <table className=" table-auto w-full text-gray-500 dark:text-gray-40">
                        <thead className="bg-gold text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg" align='left'>Coin</th>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg" align='right'>Price</th>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg" align='right'>24h Change</th>
                                <th scope="col" className="py-3 px-6 font-Montserrat text-lg" align='right'>Market Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable()}
                        </tbody>
                    </table>
                }

            </div>
            <Pagination totalCount={(filtered.length / 10).toFixed(0)} paginate={paginate} />
        </Container>
    )
}

export default CoinsTable


