import React from 'react'
import { useParams } from 'react-router-dom'
import Chart from '../Containers/Chart'
import Sidebar from '../Containers/Sidebar'

const CoinPage = () => {

  const {id} = useParams();

  return (
    <div className="flex ">
    <Sidebar id={id} />
    <Chart id={id} />
    </div>
  )
}

export default CoinPage