import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500 '>
        <p>CONTACT<span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-29 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600 '>OUR  OFFICE</p>
          <p className=' text-gray-500'> 1234 Hyderabad rangareddy <br/> Tuslai Gardens</p>
          <p className='text-gray-500'> Tel:(91) 890-098-890-123 <br /> Email: thetechworld@gmail.com</p>
          <p className='font-semibold text-lg text-gray-700'>Carrers at prictipo</p>
          <p className='text-gray-500'> Learn about our teams and Job openings </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white tansition-all duration-700'>Explore Jobs </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
