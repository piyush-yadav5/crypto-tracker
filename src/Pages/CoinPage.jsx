import { Container } from '@mui/material'
import React from 'react'
import Chart from '../Containers/Chart'
import Sidebar from '../Containers/Sidebar'

const CoinPage = () => {
  return (
    <Container>
    <Sidebar />
    <Chart />
    </Container>
  )
}

export default CoinPage