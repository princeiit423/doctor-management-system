import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify';

const DoctorProfile = () => {
  const {profileData,setProfileData,getProfileData,dToken,backendUrl} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)

  const [isEdit, setIsEdit]= useState(false)

const updateProfile = async()=>{
  try {
    const updateData = {
      address: profileData.address,
      fees: profileData.fees,
      available: profileData.available
    }
    const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
    if(data.success === true){
      toast.success(data.message)
      setIsEdit(false)
      getProfileData()

    }
  } catch (error) {
    toast.error(error.message)
  }
}

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])
  return profileData &&  (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-[#5f6FFF] w-full sm:max-w-64 rounded-lg ' src={profileData.image} alt='' />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* ----- Doc info degree,dob,name,experience */ }
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700 '>{profileData.name} </p>
          <div className='flex items-center gap-2 m-1 text-gray-600'>
            <p >{profileData.degree} - {profileData.speciality} </p>
            <button className='py-0.5px-2 text-xs rounded-full'>{profileData.experience} </button>
          </div>

          {/* Doctor about text  */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About: </p>
            <p className='text-sm text-gray-600 max-w[700px] mt-1'>
              {profileData.about}
            </p>
          </div>
          <p className='text-gray-600 font-medium mt-4'> Appointment fees: <span className='text-gray-800'>{currency} {isEdit?<input onChange={(e)=>setProfileData(prev => ({...prev,fees:e.target.value}))} value={profileData.fees} type="number"/> : profileData.fees} </span></p>
          <div className='flex gap-2 py-2'>
            <p>Address: </p>
            <p  className='text-sm' >{isEdit ? <input onChange={(e)=>setProfileData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} type='text'/> : profileData.address.line1} </p>
            <br/>
            <p  className='text-sm' >{isEdit ? <input onChange={(e)=>setProfileData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2} type='text'/> : profileData.address.line2} </p>
          </div>

          <div className='flex gap- pt-2'>
            <input  checked={profileData.available} type='checkbox' onChange={()=> isEdit && setProfileData(prev => ({...prev,available: !prev.available}))} />
            <label htmlFor=''> Available </label>
          </div>
          {
            isEdit
            ?  <button onClick={updateProfile} className='px-4 border border-[#5f6FFF] text-sm rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-allduration-150'>Save </button>
            : <button onClick={()=>setIsEdit(true)} className='px-4 border border-[#5f6FFF] text-sm rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-allduration-150'>Edit </button>
          }
          
                
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
