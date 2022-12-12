import { Typography, LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CurrencyContext';
import { numberWithCommas } from '../App';

const Sidebar = ({ id }) => {

    const [coin, setCoin] = useState();

    const { currency, symbol } = CryptoState();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCoin = async () => {
            setLoading(true);
            const { data } = await axios.get(SingleCoin(id));

            setCoin(data);

            setLoading(false);
        }
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
        { loading ? <LinearProgress className='bg-gold w-1/3' /> :
        <div className='mt-7 lg:w-1/3 sm:w-full flex flex-col items-center border-r-2 lg:border-gold pr-3'>

            <img src={coin?.image.large} alt={coin?.name} className="h-52 mb-5" />
            <Typography variant='h3' className="text-white font-Montserrat font-extrabold">{coin?.name}</Typography><br />
            <Typography dangerouslySetInnerHTML={{ __html: (coin?.description.en.split(". ")[0]) }} className="text-white text-lg leading-normal font-Montserrat font-normal ml-6" />
            <div className="self-start p-6">
                <span className='flex pb-7'>
                <span className=" text-white font-Montserrat text-3xl font-extrabold">Rank: </span>&nbsp;&nbsp;&nbsp;
                <span className="text-white font-Montserrat text-3xl font-normal">{coin?.market_cap_rank}</span>
                </span>
                {/* <span className='flex pb-7'>
                <span className=" text-white font-Montserrat text-3xl font-extrabold">Current price: </span>&nbsp;&nbsp;&nbsp;
                <span className="text-white font-Montserrat text-3xl font-normal">{symbol }{" "}{numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}</span>
                </span> */}
                {/* <span className='flex pb-7'>
                <span className=" text-white font-Montserrat text-3xl font-extrabold">Market Cap: </span>&nbsp;&nbsp;&nbsp;
                <span className="text-white font-Montserrat text-3xl font-normal">{symbol }{" "}{numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  
              )}M</span>
                </span> */}
            </div>
        </div>
        }
        </>
    )
}

export default Sidebar