import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const {dToken,appointments,getAppointments} = useContext(DoctorContext)
 const {calculateAge, slotDateFormat, currency} = useContext(AppContext)
  useEffect(()=>{
    if(dToken){
      getAppointments()
    }
  },[dToken])
  return (
    <div className="w-full max-w-6xl mx-auto p-5 bg-gray-100 rounded-lg shadow-md">
  {/* Header */}
  <p className="mb-4 text-xl font-semibold text-gray-700">All Appointments</p>

  {/* Appointment Table */}
  <div className="bg-white rounded-lg shadow overflow-hidden max-h-[80vh] overflow-y-auto">
    {/* Table Headings */}
    <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-3 px-6 bg-blue-50 border-b text-gray-600 font-medium">
      <p>#</p>
      <p>Patient</p>
      <p>Payment</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Fees</p>
      <p>Action</p>
    </div>

    {/* Appointment Rows */}
    {appointments.map((item, index) => (
      <div
        key={index}
        className="flex flex-wrap sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 items-center py-4 px-6 border-b bg-white hover:bg-gray-50 transition duration-200"
      >
        {/* Index */}
        <p className="hidden sm:block text-gray-500">{index + 1}</p>

        {/* Patient Info */}
        <div className="flex items-center gap-3">
          <img className="w-10 h-10 rounded-full object-cover" src={item.userData.image} alt="Patient" />
          <p className="text-gray-700 font-medium">{item.userData.name}</p>
        </div>

        {/* Payment Type */}
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold 
            ${item.payment ? 'bg-green-100 text-green-600 border border-green-400' : 'bg-yellow-100 text-yellow-600 border border-yellow-400'}
          `}
        >
          {item.payment ? "Online" : "Cash"}
        </span>

        {/* Age */}
        <p className="hidden sm:block text-gray-500">{calculateAge(item.userData.dob)}</p>

        {/* Date & Time */}
        <p className="text-gray-600">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

        {/* Fees */}
        <p className="font-medium text-gray-700">{currency} {item.amount}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="p-2 rounded-full hover:bg-red-100 transition">
            <img className="w-8" src={assets.cancel_icon} alt="Cancel" />
          </button>
          <button className="p-2 rounded-full hover:bg-green-100 transition">
            <img className="w-8" src={assets.tick_icon} alt="Approve" />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default DoctorAppointment
