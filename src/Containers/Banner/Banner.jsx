import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className="bg-hero-pattern h-fit pb-11 mb-6">
        <div className=" text-white text-center text-4xl font-Montserrat font-semibold pt-12" >Crypto Tracker</div>
        <div className="text-center text-white text-2xl font-Montserrat py-5" >Get all the info of your fav Currency</div>
        <Carousel />
    </div>
  )
}

export default Banner