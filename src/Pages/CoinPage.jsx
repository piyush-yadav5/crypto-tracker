import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/api'
import DisplayChart from '../Containers/DisplayChart'
import Sidebar from '../Containers/Sidebar'

const CoinPage = () => {

  const {id} = useParams();

  const [coin, setCoin] = useState();

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
    <div className="lg:flex max-md:flex-col">
    <Sidebar coin={coin} loading={loading} />
    <DisplayChart coin={coin} id={id} />
    </div>
  )
}

export default CoinPage