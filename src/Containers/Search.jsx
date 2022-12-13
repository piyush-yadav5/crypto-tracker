import { Container } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api';
import { CryptoState } from '../CurrencyContext';
import CoinsTable from './CoinsTable';

//handle Search here and pass filtered array to coin table

const Search = () => {

    const [loading, setLoading] = useState(false);

    const { currency } = CryptoState();

    const [coins, setCoins] = useState([]);

    const [filterCoins, setFilterCoins] = useState([]);

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            const { data } = await axios.get(CoinList(currency));
            setCoins(data);
            setFilterCoins(data);
            setLoading(false);
        }
        fetchCoins();
    }, [currency])

    const handleSearch = (input) => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(input) ||
                coin.symbol.toLowerCase().includes(input)
        );
    };

    return (
        <Container>
            <div className='w-fill mx-auto'>
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search Your Currency"
                        onChange={(e) => setFilterCoins(handleSearch((e.target.value).toLowerCase()))} />
                </div>
            </div>
            <br /> <br />
            <CoinsTable filtered={filterCoins} loading={loading} />
        </Container>
    )
}

export default Search