import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios';
const AddDoctor = () => {
  const [docImg, setDocImg]= useState(false)
  const [name, setName] = useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [experience ,setExperience]= useState('! Year')
  const [speciality, setSpeciality]= useState('General Physician')
  const [about, setAbout]= useState('')
  const [fees, setFees]= useState('')
  const [address1, setAddress1]= useState('')
  const [address2, setAddress2]= useState('')
  const [degree, setDegree]= useState('')

  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler= async (event)=>{
      event.preventDefault();
      try {
        if(!docImg){
          return toast.error("Image not selected");
        }
        const formData = new FormData()
        formData.append('image', docImg)
        formData.append('email', email)
        formData.append('name', name)
        formData.append('password', password)
        formData.append('experience', experience)
        formData.append('fees', Number(fees))
        formData.append('about', about)
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('address', JSON.stringify({line1:address1,line2:address2}))

        // console log formData
      //  formData.forEach((value,key)=>{
       //   console.log(`${key} : ${value}`)
       // })

        const {data} = await axios.post(backendUrl +'/api/admin/add-doctor', formData, {headers:{aToken: aToken,"Content-Type": "multipart/form-data"}})
        if(data.success === true){
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
      }

  }
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 max-w-4xl max-h-[80vh] overflow-y-scroll rounded-md shadow-md">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Doctor Name</p>
              <input onChange={(e)=> setName(e.target.value)} value ={name} className="border p-2 rounded" type="text" placeholder="Name" required />
            </div>

            <div className="flex flex-col gap-1">
              <p>Doctor Email</p>
              <input onChange={(e)=> setEmail(e.target.value)} value ={email} className="border p-2 rounded" type="email" placeholder="Email" required />
            </div>

            <div className="flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e)=> setPassword(e.target.value)} value ={password} className="border p-2 rounded" type="password" placeholder="Password" required />
            </div>

            <div className="flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e)=> setExperience(e.target.value)} value ={experience} className="border p-2 rounded">
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year{`${i + 1 > 1 ? "s" : ""}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e)=> setFees(e.target.value)} value ={fees} className="border p-2 rounded" type="number" placeholder="Fees" required />
            </div>

            <div className="flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=> setSpeciality(e.target.value)} value ={speciality} className="border p-2 rounded">
                {[
                  "General Physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatrician",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e)=> setDegree(e.target.value)} value ={degree} className="border p-2 rounded" type="text" placeholder="Education" required />
            </div>

            <div className="flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e)=> setAddress1(e.target.value)} value ={address1} className="border p-2 rounded" type="text" placeholder="Address 1" required />
              <input onChange={(e)=> setAddress2(e.target.value)} value ={address2} className="border p-2 rounded" type="text" placeholder="Address 2" required />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <p>About Doctor</p>
          <textarea onChange={(e)=> setAbout(e.target.value)} value ={about} className="border p-2 rounded" rows={5} placeholder="Write about doctor" required />
        </div>

        <button type="submit" className="mt-4 bg-[#5f6FFF] text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
