import React, { useState } from 'react'
import {assets} from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name : 'Kasuri Name',
    image : assets.profile_pic,
    emial : 'rahulkasuri03@gmail.com',
    phone : '9876543256',
    address :{
      line1: '67/12-328 Goplapur',
      line2:'Tulasi Gardens Hanamkonda'
    },
    gender : 'Male',
    dob :'20-02-2000'


  })

  const [isEdit, setIsEdit] = useState(true)
  return (
    <div className='max-w-1g flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="" />
      {
        isEdit
        ?  <input className='bg-gray-50 text-3x] font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e=> setUserData(prev =>({...prev,name:e.target.value}))}/>
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-500 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3 '>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_4fr] gap-y-2.5 mt -3 text-neutral-700'>
          <p className='font-medium'>Email Id: </p>
          <p className='text-blue-500'>{userData.emial}</p>
          <p className='font-medium'>Phone: </p>
          {
            isEdit
            ? <input type="text" value={userData.phone} onChange={e=> setUserData(prev =>({...prev,phone:e.target.value}))}/>
            : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium '>Address</p>
          {
            isEdit
            ? <p> 
              <input className='bg-gray-50 ' onChange={(e)=> setUserData(prev=> ({...prev,address:{...prev,address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
              <br />
              <input className='bg-gray-50' onChange={(e)=> setUserData(prev=> ({...prev,address:{...prev,address, line2: e.target.value}}))} value={userData.address.line2} type="text" />
            </p>
            :<p className='text-gray-500'> 
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_4fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender: </p>
          {
            isEdit
            ? <input className='max-w-40 bg-gray-100' type="text" value={userData.gender} onChange={e=> setUserData(prev =>({...prev,gender:e.target.value}))}/>
            : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday: </p>
          {
            isEdit
            ? <input className='max-w-40 bg-gray-100' type="date" onChange={(e)=> setUserData(prev=> ({...prev,dob: e.target.value}))} value={userData.dob}/>
            : <p className='text-gray-400'> {userData.dob}</p>
          }
        </div>

        </div>
        <div className='mt-10'>
          {
            isEdit 
            ? <button className='border border-indigo-500 px-8 py-2 rounded-full hover:bg-indigo-400 hover:text-white translate-all duration-200' onClick={()=> setIsEdit(false)}>Save Information</button> 
            : <button className='border border-indigo-500 px-8 py-2 rounded-full hover:bg-indigo-400 hover:text-white translate-all duration-200' onClick={()=> setIsEdit(true)}>Edit</button>
          }
        </div>
      
    </div>
  )
}

export default MyProfile
