import React, { useEffect } from 'react'
import { Pagination } from '@mui/material'

const PaginationFunc = ({totalCount, paginate}) => {

  useEffect(()=>{
    paginate(1);
    // eslint-disable-next-line
  },[totalCount])
    
  return (
    <Pagination 
    count={totalCount}
    onChange={(e,value)=>paginate(value)}
    className="p-5 flex justify-center bg-opacity-80 bg-gold rounded-3xl"  
    color='primary' />
  )
}

export default PaginationFunc