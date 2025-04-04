import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
//import {assets} from '../assets/assets'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorContext } from '../context/DoctorContext.jsx';


const Login = () => {
    const [state,setState] = useState('Admin')
    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)
    const[email,setEmail]= useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler= async (event)=>{
        event.preventDefault()
        try {
          if(state === 'Admin' ){
            console.log(backendUrl + '/api/admin/login')
              const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
              if(data.success === true){
                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
              } else{
                toast.error(data.message)
              }
          } else{
                const {data} = await axios.post(backendUrl+'/api/doctor/login',{email,password})
                if(data.success === true){
                  localStorage.setItem('dToken',data.token)
                  setDToken(data.token)
                  console.log(data.token)
                }else{
                  toast.error(data.message)
                }
          }
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto '><span className='text-[#5f6FFF]'>{state} </span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email' required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required />
        </div>
        <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base '>Login</button>
        {
          state === 'Admin'
          ? <p>Doctor Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={()=>setState('Doctor')}>CLick Here</span></p>
          : <p> Admin Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={()=>setState('Admin')}>Click Here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
