import React from 'react'
import Headers from '../components/Header'
import Specialitymenu from '../components/Specialitymenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Chatbot from './Chatbot'

const Home = () => {
  return (
    <div>
        <Headers/>
        <Specialitymenu/>
        <TopDoctors/>
        <Banner/>
        <Chatbot/>

        
    </div>
  )
}

export default Home
