import { Container } from '@mui/material'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../App'
import { TrendingCoins } from '../../Config/api'
import { CryptoState } from '../../CurrencyContext'

const Carousel = () => {
    
    const [trending, setTrending] = useState([]);

    const {currency, symbol} = CryptoState();

    useEffect(() => {
        const fetchTrendingCoins = async () =>{
            const {data} = await axios.get(TrendingCoins(currency));
            setTrending(data);
        }
        fetchTrendingCoins();
    }, [currency]);

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }


    const items = trending.map((coin) => {
        let change = coin.price_change_percentage_24h.toFixed(2);
        let flag = false;
        if(change>0)
        {
            flag = true;
        }
        return(
            <Link to={`/coins/${coin.id}`}>
                <div className="grid place-items-center">
                <img src={coin.image}
                alt={coin.name}
                className="mt-5 mb-3 h-20" />
                <div className="w-fit">
                <span className="uppercase font-Montserrat font-medium text-xl">{coin.symbol} </span>
                    &nbsp; &nbsp;
                    <span>
                    {
                        flag
                        ? <span className="text-green text-xl">+{change}%</span>
                        : <span className="text-red text-xl">{change}%</span>
                    }
                </span>
                <div className="text-white text-xl font-Montserrat font-medium text-center">
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </div>
                </div>
                </div>
            </Link>
        )
    })

  return (
    <Container>
    <div className="h-1/2 items-center">
    <AliceCarousel 
    mouseTracking
    infinite
    autoPlayInterval={1000}
    animationDuration={1500}
    disableButtonsControls
    disableDotsControls
    responsive={responsive}
    items={items}
    autoPlay
     />
    </div>
    </Container>
  )
}

export default Carousel