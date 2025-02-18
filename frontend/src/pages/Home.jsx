import React from 'react'
import Headers from '../components/Header'
import Specialitymenu from '../components/Specialitymenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Headers/>
        <Specialitymenu/>
        <TopDoctors/>
        <Banner/>
    </div>
  )
}

export default Home
