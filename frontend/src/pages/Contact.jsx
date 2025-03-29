import React from 'react'
import {assets} from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='flex justify-center py-10 text-gray-500 text-2xl'>
        <p>CONTACT <span className='text-black'>US</span></p>
      </div>

      <div className='flex flex-col justify-center md:flex-row justify-center p-4'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} />

        <div className='flex flex-col pl-10'>
          <b className='text-xl text-gray-600 pt-4'>OUR OFFICE</b>
          <p className='text-gray-400 pt-5'>00000 Willms Station <br/>
          Suite 000, Washington, USA</p>

          <p className='text-gray-400 pt-10'>Tel: 8252410023 <br/>
          Email: faiz18513@gmail.com</p>

          <b className='text-xl text-gray-600 mt-10'>CAREERS AT PRESCRIPTO</b>

          <p className='text-gray-400 pt-5'>Learn more about our teams and job openings.</p>

          <button className='border border-gray-800 text-black w-[200px] h-[70px] md:w-1/2 h-1/3 mt-3 hover:text-white hover:bg-black transition-all cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
