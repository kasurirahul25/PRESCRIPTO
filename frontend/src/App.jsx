import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Fotter from './components/Fotter'
import Getmedicine from './pages/Getmedicine'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctor' element={<Doctor/>}/>
      <Route path='/doctor/:speciality' element={<Doctor/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/getmedicine' element={<Getmedicine/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/myappointments' element={<MyAppointments/>}/>
      <Route path='/appointment/:docId' element={<Appointment/>}/>

      </Routes>
      <Fotter/>
    </div>
  )
}

export default App
