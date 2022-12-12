import { Typography, LinearProgress } from '@mui/material';
import { CryptoState } from '../CurrencyContext';
import { numberWithCommas } from '../App';

const Sidebar = ({ coin, loading }) => {

    const { currency, symbol } = CryptoState();

    const currentPrice = coin?.market_data.current_price[currency.toLowerCase()] || '';

    const marketCap = (coin?.market_data.market_cap[currency.toLowerCase()]) || '';

    return (
        <>
        { loading ? (<LinearProgress className='bg-gold w-full' />) :<div className='mt-7 lg:w-1/3 sm:w-full flex flex-col items-center border-r-2 lg:border-gold pr-3'>

            <img src={coin?.image.large} alt={coin?.name} className="h-52 mb-5 max-sm:h-44" />
            <Typography variant='h3' className="text-white font-Montserrat font-extrabold">{coin?.name}</Typography><br />
            <Typography dangerouslySetInnerHTML={{ __html: (coin?.description.en.split(". ")[0]) }} className="text-white text-lg leading-normal font-Montserrat font-normal ml-6" />
            <div className="lg:self-start p-6 max-sm:self-start max-md:items-center">
                <span className='flex pb-7'>
                <span className=" text-white font-Montserrat text-2xl font-extrabold max-sm:text-xl">Rank: </span>&nbsp;&nbsp;&nbsp;
                <span className="text-white font-Montserrat text-2xl font-normal max-sm:text-xl">{coin?.market_cap_rank}</span>
                </span>
                <span className='flex pb-7'>
                <span className=" text-white font-Montserrat text-2xl font-extrabold max-sm:text-xl">Current price: </span>&nbsp;&nbsp;&nbsp;
                <span className="text-white font-Montserrat text-2xl font-normal max-sm:text-xl">{symbol }{" "}{numberWithCommas(currentPrice)}</span>
                </span>
                <span className='flex pb-7'>
                <span className=" text-white font-Montserrat text-2xl font-extrabold max-sm:text-xl">Market Cap: </span>&nbsp;&nbsp;&nbsp;
                <span className="text-white font-Montserrat text-2xl font-normal max-sm:text-xl">{symbol }{" "}{numberWithCommas(marketCap.toString().slice(0,-6))} M</span>
                </span>
            </div>
        </div>
        }
        </>
    )
}

export default Sidebar