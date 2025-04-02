import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Myprofile = () => {
  const { userData, setUserData, getUserData, backendUrl, token } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData= async ()=>{
    try {
        const formData = new FormData()
        formData.append("name", userData.name)
        formData.append("phone", userData.phone)
        formData.append("address", JSON.stringify(userData.Address))
        formData.append("dob", userData.dob)
        formData.append("gender", userData.gender)

        image && formData.append('image',image)
        const {data} = await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
        if(data.success === true){
          toast.success(data.message)
          await getUserData()
          setIsEdit(false)
          setImage(false)
        } else{
          toast.error(data.message)
        }
    } catch (error) {
      console.error("Error updating user profile data: ", error);
      toast.error(error.message);
    }
  }

  return (
    userData && (
      <div className="flex flex-col gap-2 text-sm">
       {
        isEdit ? 
        <label className="inline-block relative cursor-pointer" htmlFor="image">
          <img className="w-36 rounded opacity-75" src={ image ? URL.createObjectURL(image) : userData.image} />
          <img className="w-10 absolute bottom-12 right-12" src={image ? "" : assets.upload_icon} />
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden  />
        </label>
        :
        <img className="w-36 rounded" src={userData.image} />
      }
        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral -500 underline mt-3">
            CONTACT INFORMATION
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email Id: </p>
            <p className="text-blue-500">{userData.email} </p>
            <p className="font-medium">Phone: </p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-500">{userData.phone}</p>
            )}

            <p className="font-medium">Address: </p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      Address: { ...prev.Address, line1: e.target.value },
                    }))
                  }
                  value={userData.Address.line1}
                  type="text"
                />
                <br/>
                <input
                  className="bg-gray-50"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      Address: { ...prev.Address, line2: e.target.value },
                    }))
                  }
                  value={userData.Address.line2}
                  type="text"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.Address.line1}
                <br />
                {userData.Address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral -500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p>Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob} </p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all cursor-pointer "
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all cursor-pointer "
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Myprofile;
